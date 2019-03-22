package com.idemia.ip.office.backend.delegation.assistant.security.services;

import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Service
public class ServerSecurityContextRepositoryImpl implements ServerSecurityContextRepository {

	private final ReactiveAuthenticationManager authenticationManager;

	public ServerSecurityContextRepositoryImpl(ReactiveAuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Mono<Void> save(ServerWebExchange serverWebExchange, SecurityContext securityContext) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Mono<SecurityContext> load(ServerWebExchange serverWebExchange) {
		ServerHttpRequest request = serverWebExchange.getRequest();
		String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			String token = authHeader.substring(7);
			Authentication authentication = new AuthenticationImpl(token);
			return authenticationManager.authenticate(authentication).map(SecurityContextImpl::new);
		} else {
			return Mono.empty();
		}
	}
}
