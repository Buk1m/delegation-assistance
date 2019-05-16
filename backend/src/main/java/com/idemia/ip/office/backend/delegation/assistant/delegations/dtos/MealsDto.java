package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

@Getter
@Setter
public class MealsDto extends BaseDto {

    private Long breakfasts;

    private Long lunches;

    private Long dinners;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof MealsDto)) {
            return false;
        }
        MealsDto mealsDto = (MealsDto) o;

        return new EqualsBuilder()
                .append(breakfasts, mealsDto.breakfasts)
                .append(lunches, mealsDto.lunches)
                .append(dinners, mealsDto.dinners)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(breakfasts)
                .append(lunches)
                .append(dinners)
                .toHashCode();
    }
}
