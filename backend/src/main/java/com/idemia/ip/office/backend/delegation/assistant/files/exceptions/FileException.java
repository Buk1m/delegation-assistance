package com.idemia.ip.office.backend.delegation.assistant.files.exceptions;

import com.idemia.ip.office.backend.delegation.assistant.exceptions.ApplicationException;

public class FileException extends ApplicationException {
    public FileException(String errorCode) {
        super(errorCode);
    }

    public FileException(String message, String errorCode) {
        super(message, errorCode);
    }

    public FileException(Throwable cause, String errorCode) {
        super(cause, errorCode);
    }

    public FileException(String message, Throwable cause, String errorCode) {
        super(message, cause, errorCode);
    }
}
