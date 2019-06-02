package com.idemia.ip.office.backend.delegation.assistant.reports.controllers;

import com.idemia.ip.office.backend.delegation.assistant.reports.dtos.DelegationReportDto;
import com.idemia.ip.office.backend.delegation.assistant.reports.services.ReportService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class ReportController {

    private final ReportService reportService;
    private final ModelMapper reportModelMapper;

    public ReportController(ReportService reportService, ModelMapper reportModelMapper) {
        this.reportService = reportService;
        this.reportModelMapper = reportModelMapper;
    }

    @GetMapping("/delegations/{delegationId}/report-preview")
    public Mono<ResponseEntity<DelegationReportDto>> getDelegationReportPreview(
            @PathVariable("delegationId") Long delegationId, Authentication authentication) {
        return reportService.getDelegationPreview(delegationId, authentication)
                .map(d -> reportModelMapper.map(d, DelegationReportDto.class))
                .map(ResponseEntity::ok);
    }
}
