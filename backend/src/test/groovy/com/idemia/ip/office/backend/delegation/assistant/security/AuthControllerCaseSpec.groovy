package com.idemia.ip.office.backend.delegation.assistant.security

import com.idemia.ip.office.backend.delegation.assistant.security.controllers.AuthController
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthData
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import com.idemia.ip.office.backend.delegation.assistant.security.exceptions.AuthenticationException
import com.idemia.ip.office.backend.delegation.assistant.security.services.AuthService
import com.idemia.ip.office.backend.delegation.assistant.security.services.TokenService
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService
import org.springframework.http.ResponseEntity
import reactor.core.publisher.Mono
import spock.lang.Specification

class AuthControllerCaseSpec extends Specification {

    AuthService authService = Mock(AuthService)
    UserService userService = Mock(UserService)
    TokenService tokenHelper = Mock(TokenService)
    AuthController authController = new AuthController(authService, userService, tokenHelper)

    def 'authenticate should return 200 and generated token'() {
        given: 'correct authData (login and password)'
            AuthData authData = new AuthData()
            authData.setLogin('login')
            authData.setPassword('password')

        when: 'authenticate'
            ResponseEntity<AuthToken> responseEntity = authController.authenticate(authData).block()

        then: 'controller should return 200 with generated token in response body'
            authService.authenticate(authData.getLogin(), authData.getPassword()) >> []
            userService.existsUser(authData.getLogin()) >> Mono.just(true)
            tokenHelper.createToken(authData.getLogin(), []) >> 'generatedToken'

            responseEntity.getStatusCodeValue() == 200
            responseEntity.getBody().token == 'generatedToken'
    }

    def 'authenticate should throw AuthenticationException'() {
        given: 'incorrect authData (login and password)'
            AuthData authData = new AuthData()
            authData.setLogin('login')
            authData.setPassword('password')

        when: 'authenticate'
            authController.authenticate(authData).block()

        then: 'auth service should throw an exception'
            authService.authenticate(authData.getLogin(), authData.getPassword()) >> {
                throw new AuthenticationException('security.incorrect-credentials', authData.login)
            }

            thrown AuthenticationException
    }
}