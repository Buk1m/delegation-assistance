package com.idemia.ip.office.backend.delegation.assistant.checklists.dtos;

import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ChecklistTemplateDto extends BaseDto {

    @Null(message = "{error.id.null}")
    private Long id;

    @Valid
    @NotNull(message = "{error.tasks.not.null}")
    private List<ActivityTemplateDto> activities;
}
