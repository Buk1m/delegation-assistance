package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ExceptionsHandler {

	private static final Logger LOG = LoggerFactory.getLogger(ExceptionHandler.class);

	@ExceptionHandler(ApplicationException.class)
	public Mono<ResponseEntity> handleApplicationException(ApplicationException e) {
		return Mono.just(new ExceptionDto(e.getErrorCode(), e.getMessage())).map(v -> ResponseEntity.badRequest().body(v));
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
