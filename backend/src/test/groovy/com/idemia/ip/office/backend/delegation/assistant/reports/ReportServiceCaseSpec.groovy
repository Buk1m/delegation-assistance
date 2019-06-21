package com.idemia.ip.office.backend.delegation.assistant.reports

import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.Diet
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense
import com.idemia.ip.office.backend.delegation.assistant.reports.configuration.ReportsExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DelegationReport
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DietReport
import com.idemia.ip.office.backend.delegation.assistant.reports.model.ExpenseReport
import com.idemia.ip.office.backend.delegation.assistant.reports.services.*
import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers
import spock.lang.Specification

import java.util.concurrent.Executors
import java.util.stream.Collectors

import static com.idemia.ip.office.backend.delegation.assistant.common.FinanceArithmeticStandards.scale
import static com.idemia.ip.office.backend.delegation.assistant.configuration.ModelMapperConfiguration.modelMapper
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegation
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyExpense

class ReportServiceCaseSpec extends Specification {

    DelegationService delegationService = Mock()
    ReportsExceptionProperties exceptionProperties = Mock()
    ExpenseProcessorService expenseProcessorService = Mock()
    DietProcessorService dietProcessorService = Mock()

    ReportGenerator pdfReportGenerator = Mock()
    ReportGenerator xlsxReportGenerator = Mock()

    private ReportService reportService = new ReportServiceImpl(Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor()),
            getModelMapper(),
            exceptionProperties,
            ['pdfReportGenerator': pdfReportGenerator, 'xlsxReportGenerator': xlsxReportGenerator],
            delegationService,
            expenseProcessorService,
            dietProcessorService
    )

    def 'Should sum all up'() {
        given: 'Delegation with expenses'
            Delegation delegation = anyDelegation()
            Diet diet = delegation.diet
            List<Expense> expenses = [anyExpense(), anyExpense()]
            delegation.expenses = expenses

        when: 'Report is generated'
            DelegationReport delegationReport = reportService.getDelegationPreview(1, new AuthenticationImpl('')).block()

        then: 'Total is calculated properly'
            BigDecimal expectedTotal = getExpectedTotal(diet, expenses, delegation.advancePayment)

            expectedTotal == delegationReport.totalRepayment

            delegationService.getDelegationDetails(_ as Long, _ as AuthenticationImpl) >> Mono.just(delegation)

            expenseProcessorService.processExpenses(_ as List<ExpenseReport>) >> { List<ExpenseReport> expenseReports ->
                Mono.just(expenseReports.stream()
                        .flatMap { e -> e.stream() }
                        .map { expenseReport ->
                            expenseReport.setExchangeAmount(expenseReport.expenseValue)
                            expenseReport
                        }.collect(Collectors.toList()))
            }

            dietProcessorService.assignAllowance(_ as DelegationReport) >> { DelegationReport delReport ->
                delReport
            }

            dietProcessorService.getExchangeRate(_ as DelegationReport) >> { DelegationReport delReport ->
                DietReport dietReport = delReport.getDiet()
                delReport.getDiet().setExchangeAmount(dietReport.perDiem)
                Mono.just(delReport)
            }

            dietProcessorService.prepareEntitlements(_ as DelegationReport) >> { DelegationReport delReport ->
                delReport
            }

            dietProcessorService.summarizeDiet(_ as DelegationReport) >> { DelegationReport delReport ->
                delReport
            }
    }

    def 'Should sum all up without advance payment'() {
        given: 'Delegation with expenses'
            Delegation delegation = anyDelegation()
            delegation.advancePayment = null
            Diet diet = delegation.diet
            List<Expense> expenses = [anyExpense(), anyExpense()]
            delegation.expenses = expenses

        when: 'Report is generated'
            DelegationReport delegationReport = reportService.getDelegationPreview(1, new AuthenticationImpl('')).block()

        then: 'Total is calculated properly'
            BigDecimal expectedTotal = getExpectedTotal(diet, expenses)

            expectedTotal == delegationReport.totalRepayment

            delegationService.getDelegationDetails(_ as Long, _ as AuthenticationImpl) >> Mono.just(delegation)

            expenseProcessorService.processExpenses(_ as List<ExpenseReport>) >> { List<ExpenseReport> expenseReports ->
                Mono.just(expenseReports.stream()
                        .flatMap { e -> e.stream() }
                        .map { expenseReport ->
                            expenseReport.setExchangeAmount(expenseReport.expenseValue)
                            expenseReport
                        }.collect(Collectors.toList())
                )
            }

            dietProcessorService.assignAllowance(_ as DelegationReport) >> { DelegationReport delReport ->
                delReport
            }

            dietProcessorService.getExchangeRate(_ as DelegationReport) >> { DelegationReport delReport ->
                DietReport dietReport = delReport.getDiet()
                delReport.getDiet().setExchangeAmount(dietReport.perDiem)
                Mono.just(delReport)
            }

            dietProcessorService.prepareEntitlements(_ as DelegationReport) >> { DelegationReport delReport ->
                delReport
            }

            dietProcessorService.summarizeDiet(_ as DelegationReport) >> { DelegationReport delReport ->
                delReport
            }
    }

    BigDecimal getExpectedTotal(Diet diet, List<Expense> expenses) {
        BigDecimal expensesTotal = expenses.sum { it.expenseValue } as BigDecimal
        return scale(expensesTotal.add(diet.perDiem))
    }

    BigDecimal getExpectedTotal(Diet diet, List<Expense> expenses, BigDecimal advancePayment) {
        return scale(getExpectedTotal(diet, expenses).subtract(advancePayment))
    }
    //TODO https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-122
}
