package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DelegationReport;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Component
public class XlsxReportGenerator implements ReportGenerator {

    private final Path reportTemplateFilePath;

    public XlsxReportGenerator(
            @Value("${xlsx-report-generator.system-file-path:#{null}}") Optional<String> reportTemplateSystemFilePath,
            @Value("${xlsx-report-generator.template-file-name}") String reportTemplateFileName) {
        reportTemplateFilePath = reportTemplateSystemFilePath.map(keySystemPath -> Paths.get(keySystemPath,
                reportTemplateFileName)).orElseGet(() -> getReportTemplateFilePath(reportTemplateFileName));
    }

    @Override
    public byte[] generateReport(DelegationReport delegationReport) throws IOException {
        Map<String, Object> reportParams = new HashMap<>();
        reportParams.put("delegationReport", delegationReport);
        reportParams.put("formatter", DateTimeConstants.DATE_TIME_FORMAT);
        String template = Files.readString(reportTemplateFilePath);
        return evaluateTemplate(template, reportParams);
    }

    private byte[] evaluateTemplate(String template, Map<String, Object> params) throws IOException {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(byteArrayOutputStream)) {
                Velocity.init();
                VelocityContext velocityContext = new VelocityContext();
                velocityContext.put("param", params);
                Velocity.evaluate(velocityContext, outputStreamWriter, "", template);
                byteArrayOutputStream.flush();
                outputStreamWriter.flush();
                return byteArrayOutputStream.toByteArray();
        }
    }

    private Path getReportTemplateFilePath(String reportTemplateFileName) {
        try {
            return Path.of(Objects.requireNonNull(getClass().getClassLoader().getResource(reportTemplateFileName))
                    .toURI());
        } catch (Exception e) {
            throw new ResourceNotFoundException(e);
        }
    }
}
