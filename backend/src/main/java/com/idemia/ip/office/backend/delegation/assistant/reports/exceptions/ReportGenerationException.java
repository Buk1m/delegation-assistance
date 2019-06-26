package com.idemia.ip.office.backend.delegation.assistant.reports.exceptions;

import com.idemia.ip.office.backend.delegation.assistant.exceptions.ApplicationException;
import lombok.Getter;

public class ReportGenerationException extends ApplicationException {

    @Getter
    private final String reportGeneratorTypeName;

    public ReportGenerationException(String errorCode, String reportGeneratorTypeName) {
        super(errorCode);
        this.reportGeneratorTypeName = reportGeneratorTypeName;
    }

    public ReportGenerationException(String message, String errorCode, String reportGeneratorTypeName) {
        super(message, errorCode);
        this.reportGeneratorTypeName = reportGeneratorTypeName;
    }

    public ReportGenerationException(Throwable cause, String errorCode, String reportGeneratorTypeName) {
        super(cause, errorCode);
        this.reportGeneratorTypeName = reportGeneratorTypeName;
    }

    public ReportGenerationException(String message,
            Throwable cause,
            String errorCode,
            String reportGeneratorTypeName) {
        super(message, cause, errorCode);
        this.reportGeneratorTypeName = reportGeneratorTypeName;
    }
}
