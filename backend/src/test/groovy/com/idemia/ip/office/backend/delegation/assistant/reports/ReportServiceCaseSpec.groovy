package com.idemia.ip.office.backend.delegation.assistant.reports

import com.idemia.ip.office.backend.delegation.assistant.configuration.ModelMapperConfiguration
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.reports.services.DietProcessorService
import com.idemia.ip.office.backend.delegation.assistant.reports.services.ExpenseProcessorService
import com.idemia.ip.office.backend.delegation.assistant.reports.services.ReportService
import com.idemia.ip.office.backend.delegation.assistant.reports.services.ReportServiceImpl
import reactor.core.scheduler.Scheduler
import reactor.core.scheduler.Schedulers
import spock.lang.Specification

import java.util.concurrent.Executors

import static com.idemia.ip.office.backend.delegation.assistant.configuration.ModelMapperConfiguration.modelMapper

class ReportServiceCaseSpec extends Specification {

    DelegationService delegationService = Mock()
    Scheduler scheduler = Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor())
    ExpenseProcessorService expenseProcessorService = Mock()
    DietProcessorService dietProcessorService = Mock()
    private ReportService reportService = new ReportServiceImpl(scheduler, delegationService, getModelMapper(), expenseProcessorService, dietProcessorService)
//TODO https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-122
}
