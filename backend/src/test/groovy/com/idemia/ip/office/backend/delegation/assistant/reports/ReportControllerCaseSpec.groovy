package com.idemia.ip.office.backend.delegation.assistant.reports

import com.idemia.ip.office.backend.delegation.assistant.reports.controllers.ReportController
import com.idemia.ip.office.backend.delegation.assistant.reports.services.ReportGenerator
import com.idemia.ip.office.backend.delegation.assistant.reports.services.ReportService
import com.idemia.ip.office.backend.delegation.assistant.reports.utils.ReportType
import org.modelmapper.ModelMapper
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import reactor.core.publisher.Mono
import spock.lang.Specification
import spock.lang.Unroll

class ReportControllerCaseSpec extends Specification {

    ReportService reportService = Mock()
    ReportController reportController = new ReportController(reportService, new ModelMapper())

    //TODO https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-122

    @Unroll
    def 'should get report file for #reportType'() {
        when: 'get delegation report.'
            ResponseEntity<byte[]> responseEntity = reportController.getDelegationReport(1L, reportType, Mock(Authentication)).block()

        then: 'return generated report'
            1 * reportService.getReportFile(_ as Long, _ as Authentication, _ as String) >> Mono.just(new byte[0])
            responseEntity.getStatusCodeValue() == 200
            responseEntity.getHeaders().get(HttpHeaders.CONTENT_TYPE).get(0) == reportType.getMediaType()

        where:
            reportType << [ReportType.PDF, ReportType.XLSX]
    }
}
