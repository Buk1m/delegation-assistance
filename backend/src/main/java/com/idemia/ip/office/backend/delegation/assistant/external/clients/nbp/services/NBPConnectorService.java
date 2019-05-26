package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.services;

import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeInfo;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Set;

public interface NBPConnectorService {

    Mono<Set<ExchangeCurrencyRate>> getExchangeRatesForCurrencies(List<ExchangeInfo> neededExchangeInfos);
}
