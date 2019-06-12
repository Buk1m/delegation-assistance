package com.idemia.ip.office.backend.delegation.assistant.reports.utils;

import lombok.Getter;

@Getter
public enum ReportType {
    PDF("application/pdf", "pdfReportGenerator", ".pdf"),
    XLSX("application/xml", "xlsxReportGenerator", ".xml");

    private String mediaType;
    private String beanName;
    private String fileExtension;

    ReportType(String mediaType, String beanName, String fileExtension) {
        this.mediaType = mediaType;
        this.beanName = beanName;
        this.fileExtension = fileExtension;
    }
}
