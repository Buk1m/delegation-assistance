package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Currency;

@Getter
@Setter
public class ExchangeInfo {

    private LocalDate exchangeDate;

    private Currency currencyCode;

    public String getCurrencyCode() {
        return currencyCode.getCurrencyCode();
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = Currency.getInstance(currencyCode);
    }

    public ExchangeInfo() {
    }

    public ExchangeInfo(String currencyCode, LocalDate exchangeDate) {
        this.exchangeDate = exchangeDate;
        this.currencyCode = Currency.getInstance(currencyCode);
    }
}
