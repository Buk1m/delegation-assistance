package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPost;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Currency;

@Getter
@Setter
public class DietDto extends BaseDto {

    @NotNull(message = "{error.message.not.null}", groups = OnPost.class)
    private Currency currency;

    @NotNull(message = "{error.message.not.null}", groups = OnPost.class)
    private BigDecimal perDiem;

    public String getCurrency() {
        return currency.getCurrencyCode();
    }

    public void setCurrency(String dietCurrency) {
        this.currency = Currency.getInstance(dietCurrency);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DietDto dietDto = (DietDto) o;

        return new EqualsBuilder()
                .append(currency, dietDto.currency)
                .append(perDiem, dietDto.perDiem)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(currency)
                .append(perDiem)
                .toHashCode();
    }
}
