package com.idemia.ip.office.backend.delegation.assistant.reports.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ConfigurationProperties(prefix = "exception.reports")
@Getter
@Setter
public class ReportsExceptionProperties {
    String reportTypeNotSupported;
    String reportGenerationProblem;
    String reportGenerationNotAllowed;
}
