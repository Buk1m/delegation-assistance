package com.idemia.ip.office.backend.delegation.assistant.users.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import reactor.core.publisher.Mono;

public interface UserService {
	Mono<Void> addUser(User user);
	Mono<Boolean> existsUser(String login);
	Mono<User> getUser(String login);
}
