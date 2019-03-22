package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;

public class EntityNotFoundException extends ApplicationException {

	@Getter
	private final Class entityClass;

	public EntityNotFoundException(String errorCode, Class entityClass) {
		super(errorCode);
		this.entityClass = entityClass;
	}

	public EntityNotFoundException(String message, String errorCode, Class entityClass) {
		super(message, errorCode);
		this.entityClass = entityClass;
	}

	public EntityNotFoundException(Throwable cause, String errorCode, Class entityClass) {
		super(cause, errorCode);
		this.entityClass = entityClass;
	}

	public EntityNotFoundException(String message, Throwable cause, String errorCode, Class entityClass) {
		super(message, cause, errorCode);
		this.entityClass = entityClass;
	}
}
