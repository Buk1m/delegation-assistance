package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import com.idemia.ip.office.backend.delegation.assistant.entities.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Currency;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseReport {

    private BigDecimal expenseValue;

    private String expenseName;

    private LocalDate expenseDate;

    private PaymentType paymentType;

    private BigDecimal exchangeRate;

    private BigDecimal exchangeAmount;

    private Currency expenseCurrency;

    private Currency targetCurrency;

    public String getExpenseCurrency() {
        return expenseCurrency.getCurrencyCode();
    }

    public void setExpenseCurrency(String targetCurrency) {
        this.expenseCurrency = Currency.getInstance(targetCurrency);
    }

    public String getTargetCurrency() {
        return targetCurrency.getCurrencyCode();
    }

    public void setTargetCurrency(String targetCurrency) {
        this.targetCurrency = Currency.getInstance(targetCurrency);
    }
}
