package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
abstract class ApiSubError {
    private String message;

    ApiSubError(String message) {
        this.message = message;
    }
}
