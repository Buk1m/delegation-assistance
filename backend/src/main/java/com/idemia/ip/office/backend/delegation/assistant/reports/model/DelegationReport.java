package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Currency;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DelegationReport {

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String countryName;

    private BigDecimal advancePayment;

    private String destinationLocation;

    private String delegationObjective;

    private String place;

    private BigDecimal duration;

    private List<FlightReport> flights;

    private List<AccommodationReport> accommodations;

    private DietReport diet;

    private MealsReport meals;

    private DietReturns dietReturns;

    private List<ExpenseReport> expenseReturns;

    private BigDecimal total;

    private Currency targetCurrency;

    public String getTargetCurrency() {
        return targetCurrency.getCurrencyCode();
    }

    public void setTargetCurrency(String targetCurrency) {
        this.targetCurrency = Currency.getInstance(targetCurrency);
    }
}
