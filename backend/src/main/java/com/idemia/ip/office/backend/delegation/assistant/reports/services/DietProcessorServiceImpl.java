package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.reports.model.Allowance;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DelegationReport;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DietReport;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.Entitlements;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.MealsReport;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.HOURS_PER_DAY_INT;
import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeHelper.longHoursDurationBetweenDays;
import static com.idemia.ip.office.backend.delegation.assistant.common.FinanceArithmeticStandards.MEDIUM_DAY_DIEM_PART;
import static com.idemia.ip.office.backend.delegation.assistant.common.FinanceArithmeticStandards.SHORTEST_DAY_DIEM_PART;
import static com.idemia.ip.office.backend.delegation.assistant.common.FinanceArithmeticStandards.exchange;
import static com.idemia.ip.office.backend.delegation.assistant.common.FinanceArithmeticStandards.scale;
import static com.idemia.ip.office.backend.delegation.assistant.reports.common.EntitlementsConstants.SINGLE_BREAKFAST_ENTITLEMENT;
import static com.idemia.ip.office.backend.delegation.assistant.reports.common.EntitlementsConstants.SINGLE_DINNER_ENTITLEMENT;
import static com.idemia.ip.office.backend.delegation.assistant.reports.common.EntitlementsConstants.SINGLE_LUNCH_ENTITLEMENT;

@Service
public class DietProcessorServiceImpl implements DietProcessorService {

    private static final BigDecimal HUNDRED_PERCENT = new BigDecimal("100");

    private final ExchangeRatesProvider exchangeRatesProvider;

    public DietProcessorServiceImpl(ExchangeRatesProvider exchangeRatesProvider) {this.exchangeRatesProvider = exchangeRatesProvider;}

    @Override
    public DelegationReport summarizeDiet(DelegationReport delegationReport) {
        BigDecimal totalDiems = getTotalDiems(delegationReport);
        delegationReport.getDiemReturns().setTotalDiems(totalDiems);
        DietReport dietReport = delegationReport.getDiet();
        dietReport.setPerDiem(totalDiems);
        BigDecimal exchangedDiem = exchange(dietReport.getPerDiem(), dietReport.getExchangeRate());
        dietReport.setExchangeAmount(exchangedDiem);
        return delegationReport;
    }

    @Override
    public DelegationReport assignAllowance(DelegationReport delegationReport) {
        DietReport dietReport = delegationReport.getDiet();
        Allowance allowance = new Allowance(dietReport.getCurrency(), dietReport.getPerDiem());
        delegationReport.getDiemReturns().setAllowance(allowance);
        return delegationReport;
    }

    @Override
    public DelegationReport prepareEntitlements(DelegationReport delegationReport) {
        Entitlements entitlements = calculateEntitlements(delegationReport);
        delegationReport.getDiemReturns().setEntitlements(entitlements);

        return delegationReport;
    }

    @Override
    public Mono<DelegationReport> getExchangeRate(DelegationReport delegationReport) {
        return exchangeRatesProvider.getDiemExchange(delegationReport.getDiet())
                .map(e -> {
                    delegationReport.getDiet().setExchangeRate(e.getRate());
                    return delegationReport;
                });
    }

    private BigDecimal getTotalDiems(DelegationReport delegationReport) {
        return scale(delegationReport.getDiemReturns()
                .getAllowance()
                .getBasePerDiem()
                .multiply(delegationReport.getDiemReturns().getEntitlements().getTotalPercentage()));
    }

    private Entitlements calculateEntitlements(DelegationReport delegationReport) {
        Entitlements entitlements = new Entitlements();
        MealsReport meals = delegationReport.getMeals();
        entitlements.setBreakfastPercentage(getMealPercentage(SINGLE_BREAKFAST_ENTITLEMENT, meals.getBreakfasts()));
        entitlements.setLunchesPercentage(getMealPercentage(SINGLE_LUNCH_ENTITLEMENT, meals.getLunches()));
        entitlements.setDinnersPercentage(getMealPercentage(SINGLE_DINNER_ENTITLEMENT, meals.getDinners()));
        entitlements.setPerDiemPercentage(getPerDiemPercentage(delegationReport));
        entitlements.setTotalPercentage(getTotalPercentage(entitlements));
        return fillStringEntitlements(entitlements);
    }

    private Entitlements fillStringEntitlements(Entitlements entitlements) {
        String perDiemEntitlements = getEntitlementDisplay(entitlements.getPerDiemPercentage());
        entitlements.setPerDiem(perDiemEntitlements);
        String totalEntitlements = getEntitlementDisplay(entitlements.getTotalPercentage());
        entitlements.setTotal(totalEntitlements);
        String breakfastEntitlements = getEntitlementDisplay(entitlements.getBreakfastPercentage());
        entitlements.setBreakfast(breakfastEntitlements);
        String lunchEntitlements = getEntitlementDisplay(entitlements.getLunchesPercentage());
        entitlements.setLunches(lunchEntitlements);
        String dinnerEntitlements = getEntitlementDisplay(entitlements.getDinnersPercentage());
        entitlements.setDinners(dinnerEntitlements);
        return entitlements;
    }

    private String getEntitlementDisplay(BigDecimal percentage) {
        return percentage.multiply(HUNDRED_PERCENT).toString() + "%";
    }

    private BigDecimal getTotalPercentage(Entitlements entitlements) {
        return scale(entitlements.getPerDiemPercentage()
                .subtract(entitlements.getBreakfastPercentage())
                .subtract(entitlements.getLunchesPercentage())
                .subtract(entitlements.getDinnersPercentage()));
    }

    private BigDecimal getPerDiemPercentage(DelegationReport delegationReport) {
        long totalHours = longHoursDurationBetweenDays(delegationReport.getStartDate(), delegationReport.getEndDate());
        BigDecimal totalFullDays = new BigDecimal(totalHours / HOURS_PER_DAY_INT);
        long restHours = totalHours % HOURS_PER_DAY_INT;
        BigDecimal addition = getAdditionForPartialDay(restHours);
        BigDecimal totalPerDiem = totalFullDays.add(addition);
        return scale(totalPerDiem);
    }

    private BigDecimal getAdditionForPartialDay(long restHours) {
        BigDecimal result;
        if (restHours < 8) {
            result = SHORTEST_DAY_DIEM_PART;
        } else if (restHours < 12) {
            result = MEDIUM_DAY_DIEM_PART;
        } else {
            result = HUNDRED_PERCENT;
        }
        return scale(result);
    }

    private BigDecimal getMealPercentage(BigDecimal mealLoss, Integer mealNumber) {
        BigDecimal mealNumberDecimal = new BigDecimal(mealNumber);
        return scale(mealLoss.multiply(mealNumberDecimal));
    }
}
