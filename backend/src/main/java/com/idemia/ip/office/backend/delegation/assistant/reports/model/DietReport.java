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
public class DietReport {

    private Currency currency;

    private BigDecimal perDiem;

    private BigDecimal exchangeRate;

    public String getCurrency() {
        return currency.getCurrencyCode();
    }

    public void setCurrency(String targetCurrency) {
        this.currency = Currency.getInstance(targetCurrency);
    }
}
