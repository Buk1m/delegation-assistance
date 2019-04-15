package com.idemia.ip.office.backend.delegation.assistant.common;

import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPatch;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class BaseDto {
    @NotNull(message = "{error.message.not.null}", groups = {OnPatch.class})
    private Long version;
}
