package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DelegationReport;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.ExpenseReport;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.FlightReport;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.HOURS_PER_DAY;
import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeHelper.hoursDurationBetweenDays;
import static com.idemia.ip.office.backend.delegation.assistant.common.FinanceArithmeticStandards.MONEY_FLOATING_NUMBERS;
import static com.idemia.ip.office.backend.delegation.assistant.common.FinanceArithmeticStandards.scale;
import static java.math.RoundingMode.HALF_UP;

@Service
public class ReportServiceImpl implements ReportService {

    private final Scheduler scheduler;
    private final DelegationService delegationService;
    private final ModelMapper reportModelMapper;
    private final ExpenseProcessorService expenseProcessorService;
    private final DietProcessorService dietProcessorService;

    public ReportServiceImpl(Scheduler scheduler,
            DelegationService delegationService,
            ModelMapper reportModelMapper,
            ExpenseProcessorService expenseProcessorService,
            DietProcessorService dietProcessorService) {
        this.scheduler = scheduler;
        this.delegationService = delegationService;
        this.reportModelMapper = reportModelMapper;
        this.expenseProcessorService = expenseProcessorService;
        this.dietProcessorService = dietProcessorService;
    }

    @Override
    public Mono<DelegationReport> getDelegationPreview(Long delegationId, Authentication authentication) {
        return getDelegation(delegationId, authentication)
                .publishOn(scheduler)
                .flatMap(this::processDelegationReport)
                .map(this::summarizeReport);
    }

    private DelegationReport summarizeReport(DelegationReport delegationReport) {
        BigDecimal total = delegationReport.getDiet().getExchangeAmount();
        BigDecimal expensesTotal = getExpensesTotal(delegationReport);
        total = total.subtract(delegationReport.getAdvancePayment());
        total = scale(total.add(expensesTotal));
        delegationReport.setTotalRepayment(total);
        delegationReport.setTargetCurrency(TARGET_CURRENCY);
        delegationReport.setGenerationDate(LocalDateTime.now());
        return delegationReport;
    }

    private BigDecimal getExpensesTotal(DelegationReport delegationReport) {
        return delegationReport.getExpenses()
                .stream()
                .map(ExpenseReport::getExchangeAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private Mono<DelegationReport> processDelegationReport(DelegationReport d) {
        d.setDuration(calculateDuration(d));
        d.setPlace(this.createPlaceString(d));

        Mono<List<ExpenseReport>> expensesMono = expenseProcessorService.processExpenses(d.getExpenses());
        Mono<DelegationReport> delegationReportMono = this.processDiet(d);

        return Mono.zip(expensesMono, delegationReportMono)
                .map(t -> {
                    DelegationReport delegationReport = t.getT2();
                    delegationReport.setExpenses(t.getT1());
                    return delegationReport;
                });
    }

    private Mono<DelegationReport> processDiet(DelegationReport d) {
        return Mono.just(d)
                .map(dietProcessorService::assignAllowance)
                .flatMap(dietProcessorService::getExchangeRate)
                .map(dietProcessorService::prepareEntitlements)
                .map(dietProcessorService::summarizeDiet);
    }

    private String createPlaceString(DelegationReport d) {
        if (d.getFlights() != null && d.getFlights().size() > 0) {
            String start = d.getFlights().get(0).getDeparturePlace();
            String destination = d.getDestinationLocation();
            String back = getLastFlight(d).getArrivalPlace();
            return start + "-" + destination + "-" + back;
        }
        return "Fill yourself";
    }

    private BigDecimal calculateDuration(DelegationReport d) {
        BigDecimal totalHours = hoursDurationBetweenDays(d.getStartDate(), d.getEndDate());
        return totalHours.divide(HOURS_PER_DAY, MONEY_FLOATING_NUMBERS, HALF_UP);
    }

    private Mono<DelegationReport> getDelegation(Long delegationId, Authentication authentication) {
        return delegationService.getDelegationDetails(delegationId, authentication)
                .map(d -> reportModelMapper.map(d, DelegationReport.class));
    }

    private FlightReport getLastFlight(DelegationReport d) {
        List<FlightReport> flights = d.getFlights();
        if (flights.isEmpty()) {
            throw new IllegalStateException("List shouldn't be empty");
        }
        return flights.stream()
                .sorted(Comparator.comparing(FlightReport::getArrivalDate).reversed())
                .sorted(Comparator.comparing(FlightReport::getArrivalTime).reversed())
                .max(Comparator.comparingInt(a -> a.getId().intValue()))
                .orElseGet(() -> flights.get(flights.size() - 1));
    }

    //TODO https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-238
    //TODO https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-241
}
