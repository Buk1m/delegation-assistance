package com.idemia.ip.office.backend.delegation.assistant.security.dtos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

public class AuthToken {

    @Getter
    private String token;

	@JsonCreator
	public AuthToken(@JsonProperty("token") String token) {
		this.token = token;
	}
    private void setToken(String token) {
        this.token = token;
    }
}
