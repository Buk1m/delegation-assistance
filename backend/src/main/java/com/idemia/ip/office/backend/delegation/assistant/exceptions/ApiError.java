package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
class ApiError {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    @Setter
    private String message;
    @Setter
    private List<ApiSubError> apiSubErrors = new ArrayList<>();

    ApiError() {
        this.timestamp = LocalDateTime.now();
    }

    ApiError(String message) {
        this();
        this.message = message;
    }
}
