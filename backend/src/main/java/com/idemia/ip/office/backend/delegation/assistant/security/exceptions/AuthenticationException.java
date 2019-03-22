package com.idemia.ip.office.backend.delegation.assistant.security.exceptions;

import com.idemia.ip.office.backend.delegation.assistant.exceptions.ApplicationException;

public class AuthenticationException extends ApplicationException {

	private final String login;

	public AuthenticationException(String errorCode, String login) {
		super(errorCode);
		this.login = login;
	}

	public AuthenticationException(String message, String errorCode, String login) {
		super(message, errorCode);
		this.login = login;
	}

	public AuthenticationException(Throwable cause, String errorCode, String login) {
		super(cause, errorCode);
		this.login = login;
	}

	public AuthenticationException(String message, Throwable cause, String errorCode, String login) {
		super(message, cause, errorCode);
		this.login = login;
	}
}
