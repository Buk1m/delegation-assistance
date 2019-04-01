package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.support.WebExchangeBindException;
import reactor.core.publisher.Mono;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ExceptionsHandler {
    private final static String VALIDATION_ERROR_MESSAGE = "There are model's constraint violations";

    @ExceptionHandler(ForbiddenAccessException.class)
    public Mono<ResponseEntity> handleForbiddenAccessException(ForbiddenAccessException e) {
        return Mono.just(new ExceptionDto(e.getErrorCode(), e.getMessage()))
                .map(dto -> ResponseEntity.status(FORBIDDEN).body(dto));
    }

    @ExceptionHandler(ApplicationException.class)
    public Mono<ResponseEntity> handleApplicationException(ApplicationException e) {
        return Mono.just(new ExceptionDto(e.getErrorCode(), e.getMessage()))
                .map(v -> ResponseEntity.badRequest().body(v));
    }

    @ExceptionHandler(WebExchangeBindException.class)
    public Mono<ResponseEntity> handleWebExchangeBindException(WebExchangeBindException e) {
        return Mono.just(this.mapWebExchangeBindException(e))
                .map(apiError -> ResponseEntity.status(BAD_REQUEST).body(apiError));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public Mono<ResponseEntity> handleConstraintViolationException(ConstraintViolationException e) {
        return Mono.just(this.mapConstraintViolationException(e))
                .map(apiError -> ResponseEntity.status(BAD_REQUEST).body(apiError));
    }

    private ApiError mapConstraintViolationException(ConstraintViolationException e) {
        List<ApiSubError> apiSubErrors = e.getConstraintViolations().stream()
                .map(this::mapConstraintViolationToApiViolationError)
                .collect(Collectors.toList());
        return ApiError.builder()
                .message(VALIDATION_ERROR_MESSAGE)
                .apiSubErrors(apiSubErrors)
                .build();
    }

    private ApiError mapWebExchangeBindException(WebExchangeBindException e) {
        List<ApiSubError> apiSubErrors = e.getBindingResult().getFieldErrors()
                .stream()
                .map(this::mapFieldErrorToApiValidationError)
                .collect(Collectors.toList());
        return ApiError.builder()
                .message(VALIDATION_ERROR_MESSAGE)
                .apiSubErrors(apiSubErrors)
                .build();
    }

    private ApiSubError mapConstraintViolationToApiViolationError(ConstraintViolation constraintViolation) {
        ApiValidationError subError = new ApiValidationError(getFieldName(constraintViolation.getPropertyPath()
                .toString()), constraintViolation.getMessage());
        subError.setRejectedValue(constraintViolation.getInvalidValue());
        return subError;
    }

    private ApiSubError mapFieldErrorToApiValidationError(FieldError fieldError) {
        ApiValidationError subError = new ApiValidationError(fieldError.getField(), fieldError.getDefaultMessage());
        subError.setRejectedValue(fieldError.getRejectedValue());
        return subError;
    }

    private String getFieldName(String propertyPath) {
        int lastDotIndex = propertyPath.lastIndexOf('.');
        return propertyPath.substring(lastDotIndex + 1);
    }

    public static class ExceptionDto {

        @Getter
        private String errorCode;

        @Getter
        private String errorMessage;

        ExceptionDto(String errorCode, String errorMessage) {
            this.errorCode = errorCode;
            this.errorMessage = errorMessage;
        }
    }
}
