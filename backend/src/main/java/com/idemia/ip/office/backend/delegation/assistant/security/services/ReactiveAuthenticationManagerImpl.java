package com.idemia.ip.office.backend.delegation.assistant.security.services;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReactiveAuthenticationManagerImpl implements ReactiveAuthenticationManager {

	private final TokenService tokenHelper;

	public ReactiveAuthenticationManagerImpl(TokenService tokenHelper) {
		this.tokenHelper = tokenHelper;
	}

	@Override
	public Mono<Authentication> authenticate(Authentication authentication) {
		String token = authentication.getCredentials().toString();
		Optional<DecodedJWT> decodedJWTOptional = tokenHelper.verifyToken(token);

		if(!decodedJWTOptional.isPresent()) {
			return Mono.empty();
		}

		DecodedJWT decodedJWT = decodedJWTOptional.get();
		String issuer = decodedJWT.getIssuer();
		String subject = decodedJWT.getSubject();
		List<GrantedAuthority> authorities = decodedJWT.getClaim("authorities").asList(String.class)
				.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
		return Mono.just(new AuthenticationImpl(token, issuer, subject, authorities));
	}
}
