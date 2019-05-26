package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.services;

import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.cache.CacheService;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.configuration.NBPApiServiceProperties;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.connector.NBPConnector;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.dtos.CurrencyRatesDto;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeInfo;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.retry.Retry;
import reactor.retry.RetryContext;

import java.time.LocalDate;
import java.util.Currency;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class NBPConnectorServiceImpl implements NBPConnectorService {

    private final NBPConnector nbpConnector;
    private final CacheService cacheService;
    private final ModelMapper modelMapper;
    private final NBPApiServiceProperties nbpApiServiceProperties;

    public NBPConnectorServiceImpl(NBPConnector nbpConnector,
            CacheService cacheService,
            ModelMapper modelMapper,
            NBPApiServiceProperties nbpApiServiceProperties) {
        this.nbpConnector = nbpConnector;
        this.cacheService = cacheService;
        this.modelMapper = modelMapper;
        this.nbpApiServiceProperties = nbpApiServiceProperties;
    }

    @Override
    public Mono<Set<ExchangeCurrencyRate>> getExchangeRatesForCurrencies(List<ExchangeInfo> allExchanges) {
        Set<ExchangeCurrencyRate> uniqueExchanges = mapExchangesToCurrencyRates(allExchanges);
        return Flux.fromIterable(uniqueExchanges)
                .flatMap(this::getRate)
                .collect(Collectors.toSet());
    }

    private Flux<ExchangeCurrencyRate> getRate(ExchangeCurrencyRate exchangeCurrencyRate) {
        return Flux.just(exchangeCurrencyRate)
                .flatMap(cacheService::getCachedRate)
                .flatMap(o -> o.map(Flux::just)
                        .orElseGet(() -> this.makeGetRequests(exchangeCurrencyRate)
                                .flatMap(cacheService::addRate))
                );
    }

    private Set<ExchangeCurrencyRate> mapExchangesToCurrencyRates(List<ExchangeInfo> exchanges) {
        return exchanges.stream()
                .map(e -> modelMapper.map(e, ExchangeCurrencyRate.class))
                .collect(Collectors.toSet());
    }

    private Flux<ExchangeCurrencyRate> makeGetRequests(ExchangeCurrencyRate exchangeCurrencyRate) {
        AtomicInteger daysBack = new AtomicInteger(0);
        Currency currency = Currency.getInstance(exchangeCurrencyRate.getCurrencyCode());
        LocalDate exchangeRateDate = exchangeCurrencyRate.getExchangeDate();
        return Mono.just(0)
                .flatMap(i -> nbpConnector.getCurrencyRates(currency, effectiveExchangeDate(exchangeRateDate, daysBack)))
                .retryWhen(Retry.onlyIf(context -> shouldRetry(context, daysBack)))
                .flatMapIterable(dto -> mapRates(dto, exchangeCurrencyRate));
    }

    private boolean shouldRetry(RetryContext<Object> context, AtomicInteger retries) {
        return context.exception() instanceof WebClientResponseException &&
                ((WebClientResponseException) context.exception()).getStatusCode().is4xxClientError() &&
                retries.getAndIncrement() < nbpApiServiceProperties.getMaxDaysBack();
    }

    private LocalDate effectiveExchangeDate(LocalDate date, AtomicInteger daysBack) {
        return date.plusDays(-daysBack.get());
    }

    private List<ExchangeCurrencyRate> mapRates(CurrencyRatesDto dto, ExchangeCurrencyRate exchangeCurrencyRate) {
        return dto.getRates()
                .stream()
                .map(r -> new ExchangeCurrencyRate(dto.getCurrencyCode(),
                        r.getEffectiveDate(),
                        exchangeCurrencyRate.getExchangeDate(),
                        r.getRate())
                )
                .collect(Collectors.toList());
    }
}
