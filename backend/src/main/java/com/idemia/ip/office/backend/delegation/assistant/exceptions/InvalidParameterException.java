package com.idemia.ip.office.backend.delegation.assistant.exceptions;

public class InvalidParameterException extends ApplicationException {

    public InvalidParameterException(String errorCode) {
        super(errorCode);
    }

    public InvalidParameterException(String message, String errorCode) {
        super(message, errorCode);
    }

    public InvalidParameterException(Throwable cause, String errorCode) {
        super(cause, errorCode);
    }

    public InvalidParameterException(String message, Throwable cause, String errorCode) {
        super(message, cause, errorCode);
    }
}