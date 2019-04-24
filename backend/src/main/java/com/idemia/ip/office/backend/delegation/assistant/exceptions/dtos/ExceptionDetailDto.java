package com.idemia.ip.office.backend.delegation.assistant.exceptions.dtos;

import lombok.Getter;

public class ExceptionDetailDto {

    @Getter
    private String message;

    public ExceptionDetailDto(String message) {
        this.message = message;
    }
}
