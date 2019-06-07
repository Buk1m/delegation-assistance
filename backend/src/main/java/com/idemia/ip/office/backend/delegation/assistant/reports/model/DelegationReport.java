package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DelegationReport {

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private LocalDateTime generationDate;

    private String countryName;

    private BigDecimal advancePayment;

    private DelegationStatus delegationStatus;

    private String destinationLocation;

    private String delegationObjective;

    private String place;

    private BigDecimal duration;

    private List<FlightReport> flights = new ArrayList<>();

    private List<AccommodationReport> accommodations = new ArrayList<>();

    private DietReport diet = new DietReport();

    private MealsReport meals = new MealsReport();

    private DiemReturns diemReturns = new DiemReturns();

    private List<ExpenseReport> expenses = new ArrayList<>();

    private User delegatedEmployee = new User();

    private BigDecimal totalRepayment;

    private Currency targetCurrency;

    public String getTargetCurrency() {
        return targetCurrency.getCurrencyCode();
    }

    public void setTargetCurrency(String targetCurrency) {
        this.targetCurrency = Currency.getInstance(targetCurrency);
    }
}
