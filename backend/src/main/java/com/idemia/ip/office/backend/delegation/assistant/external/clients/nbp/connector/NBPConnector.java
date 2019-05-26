package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.connector;

import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.configuration.NBPApiProperties;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.dtos.CurrencyRatesDto;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.policies.RetryPolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.util.UriBuilder;
import reactor.core.publisher.Mono;
import reactor.retry.RetryContext;

import java.net.URI;
import java.time.LocalDate;
import java.util.Currency;
import java.util.function.Function;

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_FORMAT;
import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class NBPConnector {

    private static final Logger LOG = LoggerFactory.getLogger(NBPConnector.class);

    private final NBPApiProperties nbpApiProperties;
    private final WebClient webClient;
    private final RetryPolicy retryPolicy;

    public NBPConnector(NBPApiProperties nbpApiProperties,
            WebClient.Builder webClientBuilder,
            RetryPolicy retryPolicy) {
        this.nbpApiProperties = nbpApiProperties;
        this.webClient = webClientBuilder
                .baseUrl(this.nbpApiProperties.getUrl())
                .defaultHeader(ACCEPT, APPLICATION_JSON_VALUE)
                .defaultHeader(CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .filter(logRequest())
                .build();
        this.retryPolicy = retryPolicy;
    }

    public Mono<CurrencyRatesDto> getCurrencyRates(Currency currency,
            LocalDate date) {
        return Mono.just(0)
                .flatMap(i -> doGetRequest(currency, date))
                .retryWhen(retryPolicy.retry(this::shouldRetry))
                .map(CurrencyRatesDto.class::cast);
    }

    private Mono<CurrencyRatesDto> doGetRequest(Currency currency, LocalDate date) {
        return this.prepareGetRequest(uriBuilder -> getUriForCurrencyRates(uriBuilder, currency, date))
                .retrieve()
                .bodyToMono(CurrencyRatesDto.class);
    }

    private boolean shouldRetry(RetryContext<Object> context) {
        return context.exception() instanceof WebClientResponseException &&
                ((WebClientResponseException) context.exception()).getStatusCode().is5xxServerError();
    }

    private URI getUriForCurrencyRates(UriBuilder uriBuilder,
            Currency currency,
            LocalDate date) {
        return uriBuilder
                .path(nbpApiProperties.getExchangeUri())
                .build(currency.getCurrencyCode(), getFormattedDate(date));
    }

    private String getFormattedDate(LocalDate dateToFormat) {
        return dateToFormat.format(DATE_FORMAT);
    }

    private WebClient.RequestHeadersSpec prepareGetRequest(Function<UriBuilder, URI> uriBuilderFunction) {
        return webClient.get()
                .uri(uriBuilderFunction);
    }

    private static ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            LOG.info("Request: {} {}", clientRequest.method(), clientRequest.url());
            return Mono.just(clientRequest);
        });
    }
}
