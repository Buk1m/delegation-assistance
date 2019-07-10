package com.idemia.ip.office.backend.delegation.assistant.integrations.providers

import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthData
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component

import com.idemia.ip.office.backend.delegation.assistant.configuration.PasswordProperties
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.test.web.reactive.server.WebTestClient

@Component
class AuthLogicProvider extends BaseLogicProvider {

    @Autowired
    private PasswordProperties passwordProperties

    AuthToken accountantToken() {
        webTestClientWrapper.signIn(passwordProperties.accountantLogin, passwordProperties.accountantPassword)
    }

    AuthToken approverToken() {
        webTestClientWrapper.signIn(passwordProperties.approverLogin, passwordProperties.approverPassword)
    }

    AuthToken employeeToken() {
        webTestClientWrapper.signIn(passwordProperties.employeeLogin, passwordProperties.employeePassword)
    }

    AuthToken travelManagerToken() {
        webTestClientWrapper.signIn(passwordProperties.travelManagerLogin, passwordProperties.travelManagerPassword)
    }

    AuthToken auth(AuthData authData) {
        webTestClientWrapper.signIn(authData.getLogin(), authData.getPassword())
        webTestClientWrapper.post('/auth', new AuthToken('employee'), authData, HttpStatus.OK, AuthToken.class)
    }

    WebTestClient.ResponseSpec tryAuth(AuthData authData) {
        webTestClientWrapper.post('/auth', employeeToken(), authData)
    }
}
