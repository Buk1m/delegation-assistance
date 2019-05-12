package com.idemia.ip.office.backend.delegation.assistant.checklists.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ChecklistTemplateDto {

    @Valid
    @NotNull(message = "{error.message.not.null}")
    @Size(min = 1, message = "{error.message.size}")
    private List<ActivityTemplateDto> activities;
}
