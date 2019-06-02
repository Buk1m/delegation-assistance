package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.connector

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.github.tomakehurst.wiremock.client.MappingBuilder
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder
import com.github.tomakehurst.wiremock.junit.WireMockRule
import com.github.tomakehurst.wiremock.matching.UrlPattern
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.configuration.NBPApiProperties
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.dtos.CurrencyRatesDto
import com.idemia.ip.office.backend.delegation.assistant.external.clients.policies.RetryPolicy
import org.junit.Rule
import org.springframework.web.reactive.function.client.WebClient
import reactor.retry.Retry
import reactor.retry.RetryContext
import reactor.retry.RetryExhaustedException
import spock.lang.Specification

import java.time.LocalDate
import java.util.function.Predicate

import static com.github.tomakehurst.wiremock.client.WireMock.*
import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_FORMAT
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyCurrencyRatesDto
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getLocalDate
import static org.springframework.http.HttpHeaders.ACCEPT
import static org.springframework.http.HttpHeaders.CONTENT_TYPE
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE

class NBPConnectorCaseSpec extends Specification {

    private static final Integer MOCK_SERVER_PORT = 1133

    @Rule
    WireMockRule wireMockRule = new WireMockRule(MOCK_SERVER_PORT)

    NBPApiProperties nbpApiProperties = Mock(NBPApiProperties) {
        getUrl() >> "http://localhost:${MOCK_SERVER_PORT}"
        getExchangeUri() >> '/exchangerates/rates/c/{currencyCode}/{date}'
    }

    RetryPolicy retryPolicy = Mock()
    NBPConnector nbpApi = new NBPConnector(nbpApiProperties, WebClient.builder(), retryPolicy)

    ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())

    def setup() {
        wireMockRule.start()
    }

    def cleanup() {
        wireMockRule.resetAll()
        wireMockRule.stop()
    }

    def 'User gets CurrencyRateDto properly'() {
        given: 'Currency date and endpoint'
            Currency currency = Currency.getInstance('EUR')
            LocalDate today = getLocalDate(DATE_FORMAT)
            String expectedUrl = "/exchangerates/rates/c/${currency.getCurrencyCode()}/${today}"
            CurrencyRatesDto expectedDto = anyCurrencyRatesDto()
            stubEndpoint(urlEqualTo(expectedUrl), 200, expectedDto)

        when: 'User wants to get Currency Rates'
            CurrencyRatesDto currencyRatesDto = nbpApi.getCurrencyRates(currency, today).block()

        then: 'User got proper object'
            currencyRatesDto == expectedDto
            expectedDto.rates == currencyRatesDto.rates

            1 * retryPolicy.retry(_ as Predicate<? super RetryContext>) >> { Predicate<? super RetryContext> retryPredicate ->
                Retry.onlyIf(retryPredicate)
                        .retryMax(3)
            }
    }

    def 'NBPApi retries when got 5xx status code in return and returns response body if succeeds'() {
        given: 'Currency date and endpoint'
            Currency currency = Currency.getInstance('EUR')
            LocalDate today = getLocalDate(DATE_FORMAT)
            CurrencyRatesDto expectedDto = anyCurrencyRatesDto()
            String expectedUrl = "/exchangerates/rates/c/${currency.getCurrencyCode()}/${today}"
            stubEndpoint(urlEqualTo(expectedUrl), 500)

        when: 'User tries to get CurrencyRateDto'
            CurrencyRatesDto currencyRatesDto = nbpApi.getCurrencyRates(currency, today).block()

        then: 'Retries happened enough times'
            1 * retryPolicy.retry(_ as Predicate<? super RetryContext>) >> { Predicate<? super RetryContext> retryPredicate ->
                stubEndpoint(urlEqualTo(expectedUrl), 200, expectedDto)
                Retry.onlyIf(retryPredicate)
                        .retryMax(3)
            }

        and: 'Expected object is returned'
            currencyRatesDto == expectedDto
            expectedDto.rates == currencyRatesDto.rates
    }

    def 'NBPApi retries when got 5xx status code in return and throws exception if fails'() {
        given: 'Currency date and endpoint'
            Currency currency = Currency.getInstance('EUR')
            LocalDate today = getLocalDate(DATE_FORMAT)
            CurrencyRatesDto expectedDto = anyCurrencyRatesDto()
            String expectedUrl = "/exchangerates/rates/c/${currency.getCurrencyCode()}/${today}"
            stubEndpoint(urlEqualTo(expectedUrl), 500, expectedDto)

        when: 'User tries to get CurrencyRateDto'
            nbpApi.getCurrencyRates(currency, today).block()

        then: 'Retries happened enough times'
            1 * retryPolicy.retry(_ as Predicate<? super RetryContext>) >> { Predicate<? super RetryContext> retryPredicate ->
                Retry.onlyIf(retryPredicate)
                        .retryMax(3)
            }

        and: 'Exception is thrown if does not succeed'
            thrown(RetryExhaustedException)
    }

    def stubEndpoint(UrlPattern urlPattern, int statusCode, Object body = null, Integer priority = null) {
        ResponseDefinitionBuilder responseDefinitionBuilder = aResponse().withHeader(ACCEPT, APPLICATION_JSON_VALUE)
                .withHeader(CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .withStatus(statusCode)

        if (body != null) {
            responseDefinitionBuilder.withBody(objectMapper.writeValueAsString(body))
        }

        MappingBuilder mappingBuilder = get(urlPattern)
                .willReturn(responseDefinitionBuilder)

        if (priority != null) {
            mappingBuilder.atPriority(priority)
        }
        wireMockRule.stubFor(mappingBuilder)
    }
}
