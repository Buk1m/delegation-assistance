package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPost;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;
import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_TIME_FORMAT_STRING;
import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DelegationDetailsDto extends BaseDto {

    @Null(message = "{error.message.field.blank}", groups = OnPost.class)
    private Long id;

    @NotNull(message = "{error.message.not.null}", groups = OnPost.class)
    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_TIME_FORMAT_STRING)
    private LocalDateTime startDate;

    @NotNull(message = "{error.message.not.null}", groups = OnPost.class)
    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_TIME_FORMAT_STRING)
    private LocalDateTime endDate;

    @NotNull(message = "{error.message.field.not.null}", groups = OnPost.class)
    @JsonInclude(NON_NULL)
    private Long destinationCountryId;

    @Null(message = "{error.message.field.blank}", groups = OnPost.class)
    @JsonProperty("destinationCountry")
    private String countryName;

    @Null(message = "{error.message.field.blank}", groups = OnPost.class)
    @JsonProperty("status")
    private DelegationStatus delegationStatus;

    private BigDecimal advancePayment;

    @NotBlank(message = "{error.message.field.not.blank}", groups = OnPost.class)
    private String destinationLocation;

    @NotBlank(message = "{error.message.field.not.blank}", groups = OnPost.class)
    private String delegationObjective;

    @Valid
    @NotNull(message = "{error.message.field.not.null}", groups = OnPost.class)
    private DietDto diet;

    @Valid
    private MealsDto meals;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DelegationDetailsDto that = (DelegationDetailsDto) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(startDate, that.startDate)
                .append(endDate, that.endDate)
                .append(countryName, that.countryName)
                .append(destinationLocation, that.destinationLocation)
                .append(delegationObjective, that.delegationObjective)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .toHashCode();
    }
}
