package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.reports.model.DelegationReport;

public interface ReportGenerator {

    byte[] generateReport(DelegationReport delegationReport) throws Exception;
}
