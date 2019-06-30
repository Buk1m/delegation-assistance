package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPatch;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@JsonPropertyOrder({ "id", "task", "description", "isDone" })
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ActivityDto extends BaseDto {

    @NotNull(message = "{error.message.not.null}", groups = OnPatch.class)
    private Long id;

    private String task;

    private String description;

    @NotNull(message = "{error.message.not.null}", groups = OnPatch.class)
    private Boolean isDone;
}
