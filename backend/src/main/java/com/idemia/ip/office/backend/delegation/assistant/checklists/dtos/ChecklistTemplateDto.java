package com.idemia.ip.office.backend.delegation.assistant.checklists.dtos;

import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ChecklistTemplateDto extends BaseDto {

    @Null(message = "{error.message.null}")
    private Long id;

    @NotNull(message = "{error.message.not.null}")
    @Size(min = 3, max = 3, message = "{error.message.size}")
    private String countryISO3;

    @Valid
    @NotNull(message = "{error.message.not.null}")
    @Size(min = 1, message = "{error.message.size}")
    private List<ActivityTemplateDto> activities;
}
