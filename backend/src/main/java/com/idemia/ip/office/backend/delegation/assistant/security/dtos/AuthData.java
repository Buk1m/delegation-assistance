package com.idemia.ip.office.backend.delegation.assistant.security.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class AuthData {

	@NotNull
	private String login;

	@NotNull
	private String password;
}
