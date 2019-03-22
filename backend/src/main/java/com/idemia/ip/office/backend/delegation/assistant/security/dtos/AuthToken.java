package com.idemia.ip.office.backend.delegation.assistant.security.dtos;

import lombok.Getter;

public class AuthToken {

	@Getter
	private String token;

	public AuthToken(String token) {
		this.token = token;
	}
}
