package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Currency;
import java.util.Optional;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE;

@Getter
@Setter
public class ExchangeCurrencyRate {

    private Currency currencyCode;

    @DateTimeFormat(iso = DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate effectiveDate;

    @DateTimeFormat(iso = DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate exchangeDate;

    private BigDecimal rate;

    public ExchangeCurrencyRate() {
    }

    public ExchangeCurrencyRate(String currencyCode, LocalDate exchangeDate) {
        this.currencyCode =  Currency.getInstance(currencyCode);
        this.exchangeDate = exchangeDate;
    }

    public ExchangeCurrencyRate(String currencyCode,
            LocalDate effectiveDate,
            LocalDate exchangeDate,
            BigDecimal rate) {
        this.currencyCode = Currency.getInstance(currencyCode);
        this.effectiveDate = effectiveDate;
        this.exchangeDate = exchangeDate;
        this.rate = rate;
    }

    public String getCurrencyCode() {
        return currencyCode.getCurrencyCode();
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = Currency.getInstance(currencyCode);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExchangeCurrencyRate that = (ExchangeCurrencyRate) o;

        return new EqualsBuilder()
                .append(currencyCode, that.currencyCode)
                .append(exchangeDate, that.exchangeDate)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(currencyCode)
                .append(exchangeDate)
                .toHashCode();
    }
}
