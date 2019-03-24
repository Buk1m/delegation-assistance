package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class ApiValidationError extends ApiSubError {
    private Object rejectedValue;
    private String field;

    ApiValidationError(String field, String message) {
        super(message);
        this.field = field;
    }
}
