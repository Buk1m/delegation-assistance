package com.idemia.ip.office.backend.delegation.assistant.reports.dtos;

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
public class AllowanceDto {

    private Currency targetCurrency;

    private BigDecimal basePerDiem;

    public AllowanceDto(String targetCurrency, BigDecimal basePerDiem) {
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
