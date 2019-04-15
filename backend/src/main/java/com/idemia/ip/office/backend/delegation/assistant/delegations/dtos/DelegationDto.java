package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPatch;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPost;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DelegationDto extends BaseDto {
    @NotNull(message = "{error.message.not.null}", groups = OnPost.class)
    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;
    @NotNull(message = "{error.message.not.null}", groups = OnPost.class)
    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;
    @NotBlank(message = "{error.message.field.not.blank}", groups = OnPost.class)
    @Size(min = 3, max = 3, message = "{error.message.size}")
    private String destinationCountryISO3;
    @NotBlank(message = "{error.message.field.not.blank}", groups = OnPost.class)
    private String destinationLocation;
    @NotBlank(message = "{error.message.field.not.blank}", groups = OnPost.class)
    private String delegationObjective;
    @Null(message = "{error.message.field.blank}", groups = OnPost.class)
    @NotNull(message = "{error.message.not.null}", groups = OnPatch.class)
    private DelegationStatus delegationStatus;

    @Null(message = "{error.message.field.blank}", groups = OnPost.class)
    private DelegationUserDto delegatedEmployee;
}
