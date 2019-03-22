package com.idemia.ip.office.backend.delegation.assistant.users

import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import com.idemia.ip.office.backend.delegation.assistant.exceptions.UniqueValueExistsException
import com.idemia.ip.office.backend.delegation.assistant.users.configuration.UsersExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.users.repositories.UserRepository
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserServiceImpl
import reactor.core.scheduler.Scheduler
import reactor.core.scheduler.Schedulers
import spock.lang.Specification

import java.util.concurrent.Executors

class UserServiceImplCaseSpec extends Specification {

	Scheduler scheduler = Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor())
	UsersExceptionProperties usersExceptionProperties = Mock(UsersExceptionProperties)
	UserRepository userRepository = Mock(UserRepository)
	UserService userService = new UserServiceImpl(scheduler, usersExceptionProperties, userRepository);

	def 'addUser(User user) should add new user'() {
		given: 'new user'
			User user = new User('login')

		when: 'add user'
			userService.addUser(user).block()

		then: 'user should be added'
			userRepository.existsByLogin(user.getLogin()) >> false
			userRepository.save(user) >> user
	}

	def 'addUser(User user) should throw UniqueValueExistsException'() {
		given: 'new user with already taken login'
			User user = new User('login')

		when: 'add user'
			userService.addUser(user).block()

		then: 'service should throw exception'
			userRepository.existsByLogin(user.getLogin()) >> true

			thrown UniqueValueExistsException
	}

	def 'existsUser(String login) should return true'() {
		given: 'user login (free)'
			String login = 'login'

		when: 'check if user exists'
			boolean result = userService.existsUser(login).block()

		then: 'result should be true'
			userRepository.existsByLogin(login) >> true
			result
	}

	def 'existsUser(String login) should return false'() {
		given: 'user login (already taken)'
			String login = 'login'

		when: 'check if user exists'
			boolean result = userService.existsUser(login).block()

		then: 'result should be false'
			userRepository.existsByLogin(login) >> false

			!result
	}

	def 'getUser(String login) should return User'() {
		given: 'user login'
			String login = 'login'

		when: 'get user by login'
			User user = userService.getUser(login).block()

		then: 'service should return user with specified login'
			userRepository.findByLogin(login) >> Optional.of(new User(login))

			user.getLogin() == login
	}

	def 'getUser(String login) should throw EntityNotFoundException'() {
		given: 'user login'
			String login = 'login'

		when: 'get user by login'
			userService.getUser(login).block()

		then: 'service should throw exception'
			userRepository.findByLogin(login) >> Optional.empty()

			thrown EntityNotFoundException
	}
}