package com.idemia.ip.office.backend.delegation.assistant.integrations

import com.idemia.ip.office.backend.delegation.assistant.configuration.PasswordProperties
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.test.web.reactive.server.WebTestClient

import com.idemia.ip.office.backend.delegation.assistant.integrations.base.BaseIntegrationSpec
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthData
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import com.idemia.ip.office.backend.delegation.assistant.security.services.TokenService

class AuthSpec extends BaseIntegrationSpec {

    @Autowired
    private TokenService tokenService

    @Autowired
    private PasswordProperties passwordProperties

    def 'Should login properly'() {
        given: 'correct credentials'
            AuthData authData = new AuthData(login: passwordProperties.getEmployeeLogin(), password: passwordProperties.getEmployeePassword())

        when: 'user tried to login'
            AuthToken authToken = authLogicProvider.auth(authData)

        then: 'user got correct auth token'
            tokenService.verifyToken(authToken.token)
    }

    def 'Should not login'() {
        given: 'incorrect credentials'
            AuthData authData = new AuthData(login: 'employee', password: 'incorrectpass')

        when: 'user tried to login'
            WebTestClient.ResponseSpec responseSpec = authLogicProvider.tryAuth(authData)

        then: 'user got correct auth token'
            responseSpec.expectStatus().isEqualTo(HttpStatus.BAD_REQUEST)
    }
}
