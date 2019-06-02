package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPatch;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPost;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.utils.ValidateDates;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_TIME_FORMAT_STRING;
import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ValidateDates(start = "startDate", end = "endDate", groups = OnPost.class)
public class DelegationDto extends BaseDto {

    private Long id;

    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_TIME_FORMAT_STRING)
    private LocalDateTime startDate;

    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_TIME_FORMAT_STRING)
    private LocalDateTime endDate;

    @JsonProperty("destinationCountry")
    private String countryName;

    private String destinationLocation;

    private String delegationObjective;

    @NotNull(message = "{error.message.not.null}", groups = OnPatch.class)
    @JsonProperty("status")
    private DelegationStatus delegationStatus;

    private DelegationUserDto delegatedEmployee;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DelegationDto that = (DelegationDto) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(startDate, that.startDate)
                .append(endDate, that.endDate)
                .append(countryName, that.countryName)
                .append(destinationLocation, that.destinationLocation)
                .append(delegationObjective, that.delegationObjective)
                .append(delegationStatus, that.delegationStatus)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .toHashCode();
    }
}
