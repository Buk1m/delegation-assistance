package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.Currency;
import java.util.List;

@Getter
@Setter
public class CurrencyRatesDto {

    @JsonProperty("code")
    private Currency currencyCode;

    private List<RatesDto> rates;

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
        CurrencyRatesDto that = (CurrencyRatesDto) o;

        return new EqualsBuilder()
                .append(currencyCode, that.currencyCode)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(currencyCode)
                .toHashCode();
    }
}
