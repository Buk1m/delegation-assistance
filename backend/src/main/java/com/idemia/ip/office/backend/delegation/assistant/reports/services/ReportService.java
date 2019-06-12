package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.reports.model.DelegationReport;
import org.springframework.security.core.Authentication;
import reactor.core.publisher.Mono;

public interface ReportService {
    String TARGET_CURRENCY = "PLN";

    Mono<DelegationReport> getDelegationPreview(Long delegationId, Authentication authentication);

    Mono<byte[]> getReportFile(Long delegationId, Authentication authentication, String reportGeneratorName);
}
