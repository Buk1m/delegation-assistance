package com.idemia.ip.office.backend.delegation.assistant.integrations.providers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.idemia.ip.office.backend.delegation.assistant.integrations.base.WebTestClientWrapper

@Component
abstract class BaseLogicProvider {

    @Autowired
    WebTestClientWrapper webTestClientWrapper
}
