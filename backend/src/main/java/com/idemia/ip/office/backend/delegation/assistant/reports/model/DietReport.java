package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Currency;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DietReport {

    private Currency currency;

    private BigDecimal perDiem;

    private BigDecimal exchangeRate;

    private BigDecimal exchangeAmount;

    public String getCurrency() {
        return currency.getCurrencyCode();
    }

    public void setCurrency(String targetCurrency) {
        this.currency = Currency.getInstance(targetCurrency);
    }

    public BigDecimal getExchangeRate() {
        return Optional.ofNullable(exchangeRate)
                .orElse(BigDecimal.ZERO);
    }
}
