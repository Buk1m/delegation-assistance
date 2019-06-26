package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DelegationReport;
import org.apache.fop.apps.FOPException;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.FopFactoryBuilder;
import org.apache.fop.apps.FopFactoryConfig;
import org.apache.fop.apps.MimeConstants;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.xml.XMLConstants;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Component
public class PdfReportGenerator implements ReportGenerator {

    private final Path reportTemplateFilePath;

    public PdfReportGenerator(
            @Value("${pdf-report-generator.system-file-path:#{null}}") Optional<String> reportTemplateSystemFilePath,
            @Value("${pdf-report-generator.template-file-name}") String reportTemplateFileName) {
        reportTemplateFilePath = reportTemplateSystemFilePath.map(keySystemPath -> Paths.get(keySystemPath,
                reportTemplateFileName)).orElseGet(() -> getReportTemplateFilePath(reportTemplateFileName));
    }

    @Override
    public byte[] generateReport(DelegationReport delegationReport)
            throws IOException, FOPException, TransformerException {
        Map<String, Object> reportParams = new HashMap<>();
        reportParams.put("delegationReport", delegationReport);
        reportParams.put("dateTimeFormatter", DateTimeConstants.DATE_TIME_REPORT_FORMAT);
        String template = Files.readString(reportTemplateFilePath);
        String evaluatedTemplate = evaluateTemplate(template, reportParams);

        try (ByteArrayOutputStream reportOutputStream = new ByteArrayOutputStream()) {
            FopFactory fopFactory = FopFactory.newInstance(new File(".").toURI());
            Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, reportOutputStream);
            transformTemplateToPdf(evaluatedTemplate, fop);
            return reportOutputStream.toByteArray();
        }
    }

    private void transformTemplateToPdf(String evaluatedTemplate, Fop fop) throws TransformerException, FOPException {
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        transformerFactory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setParameter("versionParam", "2.0");
        transformer.transform(new StreamSource(new StringReader(evaluatedTemplate)),
                new SAXResult(fop.getDefaultHandler()));
    }

    private String evaluateTemplate(String template, Map<String, Object> params) {
        Velocity.init();
        StringWriter preparedContent = new StringWriter();
        VelocityContext velocityContext = new VelocityContext();
        velocityContext.put("param", params);
        Velocity.evaluate(velocityContext, preparedContent, "", template);
        return preparedContent.toString();
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
