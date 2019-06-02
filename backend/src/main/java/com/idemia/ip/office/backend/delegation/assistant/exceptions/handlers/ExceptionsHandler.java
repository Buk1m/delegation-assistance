package com.idemia.ip.office.backend.delegation.assistant.exceptions.handlers;

import com.idemia.ip.office.backend.delegation.assistant.exceptions.ApplicationException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.dtos.ConstraintViolationDto;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.dtos.ExceptionDetailDto;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.dtos.ExceptionDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.support.WebExchangeBindException;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ExceptionsHandler {

    private static final Logger LOG = LoggerFactory.getLogger(ExceptionsHandler.class);

    private static final String CONSTRAINT_VIOLATIONS_ERROR_CODE = "constraint-violations";
    private static final String CONSTRAINT_VIOLATIONS_ERROR_MESSAGE = "There are model's constraint violations.";

    @ExceptionHandler(Exception.class)
    public Mono<ResponseEntity> handleException(Exception e) {
        LOG.error("An unexpected error has occurred! ", e);
        return Mono.just(ResponseEntity.status(INTERNAL_SERVER_ERROR).build());
    }

    @ExceptionHandler(ResponseStatusException.class)
    public Mono<ResponseEntity> handleResponseStatusException(ResponseStatusException e) {
        LOG.info("Failed to process response, with message: {} ", e.getMessage(), e);
        return Mono.just(ResponseEntity.status(e.getStatus()).build());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public Mono<ResponseEntity> handleApplicationException(AccessDeniedException e) {
        LOG.info("Access was denied. ", e);
        return Mono.just(ResponseEntity.status(FORBIDDEN).build());
    }

    @ExceptionHandler(ApplicationException.class)
    public Mono<ResponseEntity> handleApplicationException(ApplicationException e) {
        LOG.info("Business logic, request couldn't be processed. ", e);
        return Mono.just(new ExceptionDto(e.getErrorCode(), e.getMessage()))
                .map(exceptionDto -> ResponseEntity.badRequest().body(exceptionDto));
    }

    @ExceptionHandler(WebExchangeBindException.class)
    public Mono<ResponseEntity> handleWebExchangeBindException(WebExchangeBindException e) {
        LOG.info("Constraint violation. ", e);
        return Mono.just(mapWebExchangeBindException(e))
                .map(exceptionDto -> ResponseEntity.status(BAD_REQUEST).body(exceptionDto));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public Mono<ResponseEntity> handleConstraintViolationException(ConstraintViolationException e) {
        LOG.info("Constraint violation. ", e);
        return Mono.just(mapConstraintViolationException(e))
                .map(exceptionDto -> ResponseEntity.status(BAD_REQUEST).body(exceptionDto));
    }

    @ExceptionHandler(ObjectOptimisticLockingFailureException.class)
    public Mono<ResponseEntity> handleObjectOptimisticLockingFailureException(ObjectOptimisticLockingFailureException e) {
        LOG.info("Conflict occurred. ", e);
        return Mono.just(ResponseEntity.status(CONFLICT).build());
    }

    private ExceptionDto mapConstraintViolationException(ConstraintViolationException e) {
        List<ExceptionDetailDto> exceptionDetails = e.getConstraintViolations()
                .stream()
                .map(this::mapConstraintViolationToApiViolationError)
                .collect(Collectors.toList());
        return new ExceptionDto(CONSTRAINT_VIOLATIONS_ERROR_CODE,
                CONSTRAINT_VIOLATIONS_ERROR_MESSAGE,
                exceptionDetails);
    }

    private ExceptionDto mapWebExchangeBindException(WebExchangeBindException e) {
        List<ExceptionDetailDto> exceptionDetails = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(this::mapFieldErrorToApiValidationError)
                .collect(Collectors.toList());
        return new ExceptionDto(CONSTRAINT_VIOLATIONS_ERROR_CODE,
                CONSTRAINT_VIOLATIONS_ERROR_MESSAGE,
                exceptionDetails);
    }

    private ConstraintViolationDto mapConstraintViolationToApiViolationError(ConstraintViolation constraintViolation) {
        return new ConstraintViolationDto(constraintViolation.getMessage(),
                constraintViolation.getInvalidValue(),
                getFieldName(constraintViolation.getPropertyPath().toString()));
    }

    private ConstraintViolationDto mapFieldErrorToApiValidationError(FieldError fieldError) {
        return new ConstraintViolationDto(fieldError.getDefaultMessage(),
                fieldError.getRejectedValue(),
                fieldError.getField());
    }

    private String getFieldName(String propertyPath) {
        int lastDotIndex = propertyPath.lastIndexOf('.');
        return propertyPath.substring(lastDotIndex + 1);
    }
}
