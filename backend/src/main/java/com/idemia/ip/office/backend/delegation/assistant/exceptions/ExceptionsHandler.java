package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.support.WebExchangeBindException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ExceptionsHandler {
    private static final Logger LOG = LoggerFactory.getLogger(ExceptionHandler.class);

    private UnexpectedErrorsProperties unexpectedErrorsProperties;

	public ExceptionsHandler(UnexpectedErrorsProperties unexpectedErrorsProperties) {
		this.unexpectedErrorsProperties = unexpectedErrorsProperties;
	}

	@ExceptionHandler(ApplicationException.class)
	public Mono<ResponseEntity> handleApplicationException(ApplicationException e) {
		return Mono.just(new ExceptionDto(e.getErrorCode(), e.getMessage())).map(v -> ResponseEntity.badRequest().body(v));
	}

	@ExceptionHandler(WebExchangeBindException.class)
	public Mono<ResponseEntity> handleWebExchangeBindException(WebExchangeBindException e) {
		return Mono.just(this.mapWebExchangeBindException(e))
				.map(apiError -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError));
	}

	@ExceptionHandler(Exception.class)
    public Mono<ResponseEntity> handleException(Exception e) {
		LOG.error("Something went wrong. ", e);
	    return Mono.just(ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new ExceptionDto(unexpectedErrorsProperties.monkeysRanOutOfBananas,
						"Our monkeys ran out of bananas. Please inform backend crew, that monkeys need bananas"))
		);
    }

	private ApiError mapWebExchangeBindException(WebExchangeBindException e) {
		ApiError error = new ApiError();
		error.setMessage("There are model's constraint violations");

		List<ApiSubError> apiSubErrors = e.getBindingResult().getFieldErrors()
				.stream()
				.map(this::mapFieldErrorToApiValidationError)
				.collect(Collectors.toList());
		error.setApiSubErrors(apiSubErrors);
		return error;
	}

	private ApiSubError mapFieldErrorToApiValidationError(FieldError fieldError) {
		ApiValidationError subError = new ApiValidationError(fieldError.getField(), fieldError.getDefaultMessage());
		subError.setRejectedValue(fieldError.getRejectedValue());
		return subError;
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
