package com.idemia.ip.office.backend.delegation.assistant.checklists.dtos;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.List;

@Data
public class ChecklistDto {

    @Null(message = "{error.id.null}")
    private Long id;

    @NotNull(message = "{error.tasks.not.null}")
    @Valid
    private List<TaskDto> tasks;
}
