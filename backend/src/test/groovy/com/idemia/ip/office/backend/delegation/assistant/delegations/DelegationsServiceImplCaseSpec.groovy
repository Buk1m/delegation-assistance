package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import reactor.core.publisher.Mono
import spock.lang.Specification

import java.time.LocalDateTime

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED

class DelegationsServiceImplCaseSpec extends Specification {
    DelegationRepository delegationRepository = Mock()
    DelegationService delegationService = new DelegationServiceImpl(delegationRepository)
    String userLogin = 'login'

    def 'Delegation status and user are correctly assigned'() {
        given: 'User and delegation'
            User user = new User(userLogin)
            Delegation delegation = new Delegation()

        when: 'Delegation is being processed'
            delegationService.addDelegation(delegation, user).block()

        then: 'Delegation has correctly assigned properties'
            1 * delegationRepository.save(_ as Delegation)
            delegation.delegationStatus == CREATED
            delegation.delegatedEmployee == user
    }
}
