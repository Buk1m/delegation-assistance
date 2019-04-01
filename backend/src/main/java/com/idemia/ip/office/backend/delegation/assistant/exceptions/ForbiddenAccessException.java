package com.idemia.ip.office.backend.delegation.assistant.exceptions;

public class ForbiddenAccessException extends ApplicationException {
    public ForbiddenAccessException(String errorCode) {
        super(errorCode);
    }

    public ForbiddenAccessException(String message, String errorCode) {
        super(message, errorCode);
    }

    public ForbiddenAccessException(Throwable cause, String errorCode) {
        super(cause, errorCode);
    }

    public ForbiddenAccessException(String message, Throwable cause, String errorCode) {
        super(message, cause, errorCode);
    }
}
