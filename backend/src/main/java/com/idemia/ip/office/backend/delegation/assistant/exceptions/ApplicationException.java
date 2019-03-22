package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;

public class ApplicationException extends RuntimeException {

	@Getter
	private final String errorCode;

	public ApplicationException(String errorCode) {
		this.errorCode = errorCode;
	}

	public ApplicationException(String message, String errorCode) {
		super(message);
		this.errorCode = errorCode;
	}

	public ApplicationException(Throwable cause, String errorCode) {
		super(cause);
		this.errorCode = errorCode;
	}

	public ApplicationException(String message, Throwable cause, String errorCode) {
		super(message, cause);
		this.errorCode = errorCode;
	}
}
