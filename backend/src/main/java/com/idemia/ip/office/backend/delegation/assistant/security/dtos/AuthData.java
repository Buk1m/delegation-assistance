package com.idemia.ip.office.backend.delegation.assistant.security.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AuthData {

    @NotNull(message = "{error.message.not.null}")
    private String login;

    @NotNull(message = "{error.message.not.null}")
    private String password;
}
