package com.idemia.ip.office.backend.delegation.assistant.delegations.services

import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import reactor.core.scheduler.Schedulers
import spock.lang.Specification

import java.util.concurrent.Executors

class ReadDelegationServiceCaseSpec extends Specification {

    DelegationRepository delegationRepository = Mock()
    ReadDelegationService readDelegationService = new ReadDelegationServiceImpl(
            Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor()),
            delegationRepository,
            new DelegationsExceptionProperties())

    def 'Service throws exception when delegation does not exist'() {
        given: 'DelegationId'
            Long delegationId = 1

        when: 'Delegation is retrieved'
            readDelegationService.getDelegation(delegationId).block()

        then: 'EntityNotFoundException is thrown'
            delegationRepository.findById(delegationId) >> Optional.empty()
            thrown(EntityNotFoundException)
    }

    def 'Service throws exception when users delegation does not exist'() {
        given: 'DelegationId and userName'
            Long delegationId = 1
            String userName = 'test'

        when: 'Delegation is retrieved'
            readDelegationService.getDelegation(delegationId, userName).block()

        then: 'EntityNotFoundException is thrown'
            delegationRepository.findByIdAndDelegatedEmployeeLogin(delegationId, userName) >> Optional.empty()
            thrown(EntityNotFoundException)
    }
}
