package com.idemia.ip.office.backend.delegation.assistant.exceptions.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

public class ExceptionDto {

    @Getter
    private String errorCode;

    @Getter
    private String errorMessage;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Getter
    private List<ExceptionDetailDto> details;

    public ExceptionDto(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public ExceptionDto(String errorCode, String errorMessage, List<ExceptionDetailDto> details) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.details = details;
    }
}
