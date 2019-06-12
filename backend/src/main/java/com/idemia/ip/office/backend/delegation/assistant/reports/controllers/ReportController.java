package com.idemia.ip.office.backend.delegation.assistant.reports.controllers;

import com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants;
import com.idemia.ip.office.backend.delegation.assistant.reports.dtos.DelegationReportDto;
import com.idemia.ip.office.backend.delegation.assistant.reports.services.ReportService;
import com.idemia.ip.office.backend.delegation.assistant.reports.utils.ReportType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @GetMapping("/delegations/{delegationId}/report")
    public Mono<ResponseEntity<byte[]>> getDelegationReport(@PathVariable("delegationId") Long delegationId,
            @RequestParam ReportType reportType,
            Authentication authentication) {
        String contentDisposition = "attachment; filename=report_" + DateTimeConstants.DATE_TIME_FILE_NAME_FORMAT
                .format(LocalDateTime.now()) + reportType.getFileExtension();
        return reportService.getReportFile(delegationId, authentication, reportType.getBeanName())
                .map(content -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, reportType.getMediaType())
                        .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                        .body(content));
    }
}
