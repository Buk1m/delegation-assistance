package com.idemia.ip.office.backend.delegation.assistant.exceptions.dtos;

import lombok.Getter;

public class ConstraintViolationDto extends ExceptionDetailDto {

    @Getter
    private Object rejectedValue;

    @Getter
    private String fieldName;

    public ConstraintViolationDto(String message, Object rejectedValue, String fieldName) {
        super(message);
        this.rejectedValue = rejectedValue;
        this.fieldName = fieldName;
    }
}
