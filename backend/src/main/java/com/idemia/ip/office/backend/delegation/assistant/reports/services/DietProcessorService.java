package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.reports.model.DelegationReport;
import reactor.core.publisher.Mono;

public interface DietProcessorService {

    DelegationReport assignAllowance(DelegationReport o);

    Mono<DelegationReport> getExchangeRate(DelegationReport o);

    DelegationReport prepareEntitlements(DelegationReport o);

    DelegationReport summarizeDiet(DelegationReport o);
}
