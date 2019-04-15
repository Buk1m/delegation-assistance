package com.idemia.ip.office.backend.delegation.assistant.checklists.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Getter
@Setter
public class TaskDto {

    @Null(message = "{error.id.null}")
    private Long id;

    @NotNull(message = "{error.name.not.null}")
    private String name;

    private String description;
}
