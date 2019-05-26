package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.cache

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.configuration.CacheProperties
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate
import spock.lang.Specification
import spock.lang.Unroll

import java.time.LocalDate
import java.util.stream.Collectors

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyExchangeCurrencyRate

class CacheServiceCaseSpec extends Specification {

    CacheProperties cacheProperties = Mock()
    CacheService cacheService = new CacheServiceImpl(new ObjectMapper().registerModule(new JavaTimeModule()), cacheProperties)

    def 'Should add to cache and make deep copy'() {
        given: 'Set of ExchangeCurrencyRates'
            ExchangeCurrencyRate exchangeCurrencyRate = anyExchangeCurrencyRate()

        when: 'User saves objects'
            cacheService.addRate(exchangeCurrencyRate).block()

        then: 'Object is saved'
            ((CacheServiceImpl) cacheService).ratesCache.size() == 1

            !((CacheServiceImpl) cacheService).ratesCache.add(exchangeCurrencyRate)

            ((CacheServiceImpl) cacheService).ratesCache.size() == 1

        and: 'All object has different reference'
            ((CacheServiceImpl) cacheService).ratesCache.stream()
                    .noneMatch { r -> r.is(exchangeCurrencyRate) }
    }

    @Unroll
    def 'Should get matching deep copies of matching objects'(ExchangeCurrencyRate notCachedExchange, Set<ExchangeCurrencyRate> cachedExchanges, Optional<ExchangeCurrencyRate> expected) {
        given: 'Cached objects'
            cachedExchanges.stream()
                    .map { e -> cacheService.addRate(e).block() }
                    .collect(Collectors.toList())

        when: 'User gets cached exchanges'
            Optional<ExchangeCurrencyRate> retrievedExchange = cacheService.getCachedRate(notCachedExchange).block()

        then: 'Matching objects got retrieved'
            retrievedExchange.value == expected.value

        and: 'These have different reference'
            ((CacheServiceImpl) cacheService).ratesCache.stream()
                    .noneMatch { r -> retrievedExchange.is(r) }

        where: 'Parameters'
            notCachedExchange                                                                                   | cachedExchanges                                                                                       || expected
            new ExchangeCurrencyRate(currencyCode: currency('EUR'), exchangeDate: LocalDate.now())              | [new ExchangeCurrencyRate(currencyCode: currency('USD'), exchangeDate: LocalDate.now())]              || Optional.empty()
            new ExchangeCurrencyRate(currencyCode: currency('EUR'), exchangeDate: LocalDate.now())              | []                                                                                                    || Optional.empty()
            new ExchangeCurrencyRate(currencyCode: currency('EUR'), exchangeDate: LocalDate.now().plusDays(-1)) | [new ExchangeCurrencyRate(currencyCode: currency('EUR'), exchangeDate: LocalDate.now()),
                                                                                                                   new ExchangeCurrencyRate(currencyCode: currency('JPY'), exchangeDate: LocalDate.now()),
                                                                                                                   new ExchangeCurrencyRate(currencyCode: currency('EUR'), exchangeDate: LocalDate.now().plusDays(-1))] || Optional.of(new ExchangeCurrencyRate(currencyCode: currency('EUR'), exchangeDate: LocalDate.now().plusDays(-1)))

    }

    Currency currency(String currencyCode) {
        Currency.getInstance(currencyCode)
    }

    Set<ExchangeCurrencyRate> getUniqueExchangeCurrencyRates() {
        [
                new ExchangeCurrencyRate(currencyCode: Currency.getInstance('EUR'),
                        effectiveDate: LocalDate.now(),
                        exchangeDate: LocalDate.now(),
                        rate: new BigDecimal("1.2")
                ),
                new ExchangeCurrencyRate(currencyCode: Currency.getInstance('USD'),
                        effectiveDate: LocalDate.now(),
                        exchangeDate: LocalDate.now(),
                        rate: new BigDecimal("1.2")
                ),
                new ExchangeCurrencyRate(currencyCode: Currency.getInstance('EUR'),
                        effectiveDate: LocalDate.now(),
                        exchangeDate: LocalDate.now().plusDays(1),
                        rate: new BigDecimal("1.2")
                ),
        ]
    }
}
