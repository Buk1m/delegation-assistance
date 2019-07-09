package com.idemia.ip.office.backend.delegation.assistant.integrations.providers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.idemia.ip.office.backend.delegation.assistant.configuration.PasswordProperties
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken

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
}
