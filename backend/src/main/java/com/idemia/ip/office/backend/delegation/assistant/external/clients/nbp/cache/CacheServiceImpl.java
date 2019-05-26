package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.cache;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.configuration.CacheProperties;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class CacheServiceImpl implements CacheService {

    private static final Logger LOG = LoggerFactory.getLogger(CacheServiceImpl.class);

    private final ConcurrentHashMap.KeySetView<ExchangeCurrencyRate, Boolean> ratesCache = ConcurrentHashMap.newKeySet();

    private final ObjectMapper objectMapper;
    private final CacheProperties cacheProperties;

    public CacheServiceImpl(ObjectMapper objectMapper,
            CacheProperties cacheProperties) {
        this.objectMapper = objectMapper;
        this.cacheProperties = cacheProperties;
    }

    public Mono<Optional<ExchangeCurrencyRate>> getCachedRate(ExchangeCurrencyRate currencyRate) {
        return Mono.just(ratesCache.stream()
                .filter(r -> r.hashCode() == currencyRate.hashCode())
                .filter(r -> r.equals(currencyRate))
                .findFirst()).map(o -> {
            o.ifPresent(this::makeDeepCopy);
            return o;
        });
    }

    @Override
    public Mono<ExchangeCurrencyRate> addRate(ExchangeCurrencyRate exchangeCurrencyRate) {
        return Mono.fromCallable(() -> makeDeepCopy(exchangeCurrencyRate))
                .map(ratesCache::add)
                .map(e -> exchangeCurrencyRate);
    }

    @Scheduled(cron = "${cache.clear-expired-cron}")
    public void removeExpiredRates() {
        LocalDate expirationDate = LocalDate.now().plusDays(-cacheProperties.getExpirationDays());
        List<ExchangeCurrencyRate> cacheToRemove = ratesCache.stream()
                .filter(r -> r.getExchangeDate().isBefore(expirationDate))
                .collect(Collectors.toList());

        ratesCache.removeAll(cacheToRemove);
        LOG.info("Cleared cache. Total elements: {}", cacheToRemove.size());
    }

    private ExchangeCurrencyRate makeDeepCopy(ExchangeCurrencyRate exchangeCurrencyRate) {
        try {
            String serialized = objectMapper.writeValueAsString(exchangeCurrencyRate);
            return objectMapper.readValue(serialized, ExchangeCurrencyRate.class);
        } catch (IOException e) {
            LOG.error("Couldn't serialize ExchangeCurrencyRate.", e);
            throw new RuntimeException("Couldn't serialize to JSON", e);
        }
    }
}
