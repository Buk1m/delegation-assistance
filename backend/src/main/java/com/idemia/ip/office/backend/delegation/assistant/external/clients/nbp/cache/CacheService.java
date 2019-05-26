package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.cache;

import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate;
import reactor.core.publisher.Mono;

import java.util.Optional;

public interface CacheService {

    Mono<Optional<ExchangeCurrencyRate>> getCachedRate(ExchangeCurrencyRate currencyRates);

    Mono<ExchangeCurrencyRate> addRate(ExchangeCurrencyRate exchangeCurrencyRates);
}
