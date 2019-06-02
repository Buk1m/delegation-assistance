package com.idemia.ip.office.backend.delegation.assistant.reports.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Currency;

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_FORMAT_STRING;
import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseReportDto {

    private Long id;

    private BigDecimal expenseValue;

    private String expenseName;

    @DateTimeFormat(iso = DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT_STRING)
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
