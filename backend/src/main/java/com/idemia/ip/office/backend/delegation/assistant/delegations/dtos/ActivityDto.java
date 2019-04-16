package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@JsonPropertyOrder({ "id", "task", "description", "isDone" })
public class ActivityDto extends BaseDto {

    private Long id;

    private String task;

    private String description;

    private Boolean isDone;
}
