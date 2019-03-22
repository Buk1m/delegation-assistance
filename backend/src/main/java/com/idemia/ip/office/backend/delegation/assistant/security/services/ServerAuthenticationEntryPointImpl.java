package com.idemia.ip.office.backend.delegation.assistant.security.services;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.server.ServerAuthenticationEntryPoint;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Service
public class ServerAuthenticationEntryPointImpl implements ServerAuthenticationEntryPoint {

	@Override
	public Mono<Void> commence(ServerWebExchange serverWebExchange, AuthenticationException e) {
		return Mono.fromRunnable(() -> {
			serverWebExchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
			serverWebExchange.getResponse().getHeaders().set(HttpHeaders.WWW_AUTHENTICATE, "Bearer realm = '/auth'");
		});
	}
}
