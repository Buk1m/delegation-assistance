package com.idemia.ip.office.backend.delegation.assistant.checklists.dtos;

import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ActivityTemplateDto extends BaseDto {

    @Null(message = "{error.message.null}")
    private Long id;

    @NotNull(message = "{error.message.not.null}")
    private String task;

    private String description;
}
