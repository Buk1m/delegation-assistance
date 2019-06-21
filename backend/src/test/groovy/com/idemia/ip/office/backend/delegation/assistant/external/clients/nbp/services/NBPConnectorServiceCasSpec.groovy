package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.services

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.cache.CacheService
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.cache.CacheServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.configuration.CacheProperties
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.configuration.NBPApiServiceProperties
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.connector.NBPConnector
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.dtos.CurrencyRatesDto
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.dtos.RatesDto
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeInfo
import org.modelmapper.ModelMapper
import org.springframework.web.reactive.function.client.WebClientResponseException
import reactor.core.publisher.Mono
import spock.lang.Specification

import java.time.LocalDate
import java.util.stream.Collectors

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_FORMAT
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyExchangeInfo
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getExchangeInfo
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getLocalDate

class NBPConnectorServiceCasSpec extends Specification {

    NBPConnector nbpConnector = Mock()
    CacheService cacheService = Spy(new CacheServiceImpl(new ObjectMapper().registerModule(new JavaTimeModule()), Mock(CacheProperties)))
    ModelMapper modelMapper = new ModelMapper()
    NBPApiServiceProperties nbpApiServiceProperties = Mock()
    NBPConnectorService nbpApiService = new NBPConnectorServiceImpl(nbpConnector, cacheService, modelMapper, nbpApiServiceProperties)

    def 'Should return all ExchangeCurrencyRates from cache'() {
        given: 'ExchangeInfos'
            List<ExchangeInfo> exchanges = anyExchangeInfoList()
        and: 'exchange currency rate cache'
            Set<ExchangeCurrencyRate> cachedExchangeCurrencyRates = convertToExchangeRateCurrencyRate(exchanges)

        when: 'User tries to get ExchangeCurrencyRates'
            Set<ExchangeCurrencyRate> retrievedExchangeCurrencies = nbpApiService.getExchangeRatesForCurrencies(exchanges).block()

        then: 'User got all exchangeInfos'
            retrievedExchangeCurrencies.size() == cachedExchangeCurrencyRates.size()
            retrievedExchangeCurrencies.eachWithIndex {retrieved, idx ->
                retrieved == cachedExchangeCurrencyRates[idx]
            }

            3 * cacheService.getCachedRate(_ as ExchangeCurrencyRate) >> { ExchangeCurrencyRate rate ->
                Mono.just(Optional.of(rate))
            }

            0 * nbpApiServiceProperties.getMaxDaysBack()

        and: 'Connector is not invoked'
            0 * nbpConnector.getCurrencyRates(_ as Currency, _ as LocalDate)
            0 * cacheService.addRate(_ as ExchangeCurrencyRate)
    }

    def 'Should use Connector if cache does not have rates'() {
        given: 'ExchangeInfos'
            List<ExchangeInfo> exchanges = anyExchangeInfoList()
            Set<ExchangeCurrencyRate> cachedExchangeCurrencyRates = convertToExchangeRateCurrencyRate(exchanges)

        when: 'User tries to get ExchangeCurrencyRates'
            Set<ExchangeCurrencyRate> retrievedExchangeCurrencies = nbpApiService.getExchangeRatesForCurrencies(exchanges).block()

        then: 'User got all exchangeInfos'
            retrievedExchangeCurrencies.size() == cachedExchangeCurrencyRates.size()
            retrievedExchangeCurrencies == cachedExchangeCurrencyRates

            3 * cacheService.getCachedRate(_ as ExchangeCurrencyRate)

            0 * nbpApiServiceProperties.getMaxDaysBack() >> 3

        and: 'Connector is invoked'
            3 * nbpConnector.getCurrencyRates(_ as Currency, _ as LocalDate) >> { Currency currency, LocalDate date ->
                Mono.just(new CurrencyRatesDto(currencyCode: currency.getCurrencyCode(), rates: [new RatesDto(rate: new BigDecimal(2), effectiveDate: date)]))
            }

            3 * cacheService.addRate(_ as ExchangeCurrencyRate)
    }

    def 'Should back in time if wont find exchange'() {
        given: 'ExchangeInfos'
            List<ExchangeInfo> exchanges = [anyExchangeInfo()]
            LocalDate today = getLocalDate()
            int retries = 0

        when: 'User tries to get ExchangeCurrencyRates in wrong date'
            nbpApiService.getExchangeRatesForCurrencies(exchanges).block()

        then: 'Service tries to get from previous dates'
            3 * nbpConnector.getCurrencyRates(_ as Currency, _ as LocalDate) >> { Currency currency, LocalDate date ->
                date == today.plusDays(-retries)
                if (retries >= 2) {
                    return Mono.just(new CurrencyRatesDto(currencyCode: currency.getCurrencyCode(), rates: [new RatesDto(rate: new BigDecimal(2), effectiveDate: date)]))
                } else {
                    retries++
                    throw new WebClientResponseException(404, null, null, null, null)
                }
            }

            1 * cacheService.getCachedRate(_ as ExchangeCurrencyRate) >> { ExchangeCurrencyRate rate ->
                Mono.just(Optional.empty())
            }

            2 * nbpApiServiceProperties.getMaxDaysBack() >> 3

            1 * cacheService.addRate(_ as ExchangeCurrencyRate)
    }

    def 'Should return default if can not find any exchange rate'() {
        given: 'ExchangeInfos'
            List<ExchangeInfo> exchanges = [anyExchangeInfo()]
            LocalDate today = getLocalDate()
            int retries = 0

        when: 'User tries to get ExchangeCurrencyRates in wrong date'
            Set<ExchangeCurrencyRate> result =  nbpApiService.getExchangeRatesForCurrencies(exchanges).block()

        then: 'Service tries to get from previous dates'
            result.stream().allMatch{ e -> e.rate == BigDecimal.ZERO && e.effectiveDate == null}

            4 * nbpConnector.getCurrencyRates(_ as Currency, _ as LocalDate) >> { Currency currency, LocalDate date ->
                date == today.plusDays(-retries)
                retries++
                throw new WebClientResponseException(404, null, null, null, null)
            }

            1 * cacheService.getCachedRate(_ as ExchangeCurrencyRate)

            4 * nbpApiServiceProperties.getMaxDaysBack() >> 3

            0 * cacheService.addRate(_ as ExchangeCurrencyRate)
    }


    private static List<ExchangeInfo> anyExchangeInfoList() {
        [anyExchangeInfo(),
         getExchangeInfo('USD'),
         getExchangeInfo('EUR', getLocalDate().plusDays(1)),
         getExchangeInfo()]
    }

    private Set<ExchangeCurrencyRate> convertToExchangeRateCurrencyRate(List<ExchangeInfo> exchanges) {
        exchanges.stream()
                .map { e -> modelMapper.map(e, ExchangeCurrencyRate.class) }
                .collect(Collectors.toSet())
    }
}
