package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Currency;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Allowance {

    private Currency targetCurrency;

    private BigDecimal basePerDiem;

    public Allowance(String targetCurrency, BigDecimal basePerDiem) {
        this.targetCurrency = Currency.getInstance(targetCurrency);
        this.basePerDiem = basePerDiem;
    }

    public String getTargetCurrency() {
        return targetCurrency.getCurrencyCode();
    }

    public void setTargetCurrency(String targetCurrency) {
        this.targetCurrency = Currency.getInstance(targetCurrency);
    }
}
