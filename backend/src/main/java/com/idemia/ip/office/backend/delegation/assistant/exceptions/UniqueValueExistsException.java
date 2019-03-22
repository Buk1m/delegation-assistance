package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;

public class UniqueValueExistsException extends ApplicationException {

	@Getter
	private final Object value;

	public UniqueValueExistsException(String errorCode, Object value) {
		super(errorCode);
		this.value = value;
	}

	public UniqueValueExistsException(String message, String errorCode, Object value) {
		super(message, errorCode);
		this.value = value;
	}

	public UniqueValueExistsException(Throwable cause, String errorCode, Object value) {
		super(cause, errorCode);
		this.value = value;
	}

	public UniqueValueExistsException(String message, Throwable cause, String errorCode, Object value) {
		super(message, cause, errorCode);
		this.value = value;
	}
}
