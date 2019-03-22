package com.idemia.ip.office.backend.delegation.assistant.security.controllers;

import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthData;
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken;
import com.idemia.ip.office.backend.delegation.assistant.security.services.AuthService;
import com.idemia.ip.office.backend.delegation.assistant.security.services.TokenService;
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AuthController {

	private final AuthService authService;
	private final UserService userService;
	private final TokenService tokenHelper;

	public AuthController(AuthService authService, UserService userService, TokenService tokenHelper) {
		this.authService = authService;
		this.userService = userService;
		this.tokenHelper = tokenHelper;
	}

	@PostMapping("/auth")
	@Transactional
	public Mono<ResponseEntity<AuthToken>> authenticate(@RequestBody @Valid AuthData authData) {
		String login = authData.getLogin();
		List<String> authorities = authService.authenticate(login, authData.getPassword())
				.stream().map(e -> "ROLE_" + e).collect(Collectors.toList());
		Mono<AuthToken> authToken = userService.existsUser(login).map(usersExists -> {
			if (!usersExists) {
				return userService.addUser(new User(login)).subscribe();
			}
			return Mono.empty().then();
		}).map(v -> new AuthToken(tokenHelper.createToken(login, authorities)));
		return authToken.map(ResponseEntity::ok);
	}
}
