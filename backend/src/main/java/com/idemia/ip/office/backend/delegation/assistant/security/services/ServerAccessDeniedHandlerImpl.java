package com.idemia.ip.office.backend.delegation.assistant.security.services;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.server.authorization.ServerAccessDeniedHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Service
public class ServerAccessDeniedHandlerImpl implements ServerAccessDeniedHandler {

	@Override
	public Mono<Void> handle(ServerWebExchange serverWebExchange, AccessDeniedException e) {
		return Mono.fromRunnable(() -> serverWebExchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN));
	}
}
