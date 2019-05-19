package com.idemia.ip.office.backend.delegation.assistant.reports.controllers;

import com.idemia.ip.office.backend.delegation.assistant.reports.services.ReportService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {this.reportService = reportService;}
}
