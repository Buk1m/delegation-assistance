package com.idemia.ip.office.backend.delegation.assistant.checklists.dtos;

import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.List;

@Getter
@Setter
public class ChecklistDto extends BaseDto {

    @Null(message = "{error.id.null}")
    private Long id;

    @NotNull(message = "{error.tasks.not.null}")
    @Valid
    private List<TaskDto> tasks;
}
