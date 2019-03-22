package com.idemia.ip.office.backend.delegation.assistant.users.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.UniqueValueExistsException;
import com.idemia.ip.office.backend.delegation.assistant.users.configuration.UsersExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.users.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

	private final Scheduler scheduler;
	private final UsersExceptionProperties usersExceptionProperties;
	private final UserRepository userRepository;

	public UserServiceImpl(Scheduler scheduler, UsersExceptionProperties usersExceptionProperties, UserRepository userRepository) {
		this.scheduler = scheduler;
		this.usersExceptionProperties = usersExceptionProperties;
		this.userRepository = userRepository;
	}

	@Override
	public Mono<Void> addUser(User user) {
		Mono<Boolean> existsUserWithThisLogin = Mono.fromCallable(() -> userRepository.existsByLogin(user.getLogin()))
				.publishOn(scheduler);
		return existsUserWithThisLogin.flatMap(userExists -> {
			if (userExists) {
				throw userLoginAlreadyExistsException(user.getLogin());
			}

			return Mono.fromRunnable(() -> userRepository.save(user));
		});
	}

	@Override
	public Mono<Boolean> existsUser(String login) {
		return Mono.fromCallable(() -> userRepository.existsByLogin(login)).publishOn(scheduler);
	}

	@Override
	public Mono<User> getUser(String login) {
		Mono<Optional<User>> userOptional =  Mono.fromCallable(() -> userRepository.findByLogin(login))
				.publishOn(scheduler);
		return userOptional.map(e -> e.orElseThrow(() -> userNotFoundException(login)));
	}

	private EntityNotFoundException userNotFoundException(String login) {
		LOG.info("User with login {} hasn't been found.", login);
		return new EntityNotFoundException("User not found.", usersExceptionProperties.getUserNotFound(), User.class);
	}

	private UniqueValueExistsException userLoginAlreadyExistsException(String login) {
		LOG.info("User with login {} already exists.", login);
		return new UniqueValueExistsException("User login already exists.", usersExceptionProperties.getUserLoginAlreadyExists(), login);
	}
}
