package com.idemia.ip.office.backend.delegation.assistant.delegations.services

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.MealsAdjuster
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist
import com.idemia.ip.office.backend.delegation.assistant.entities.Country
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import reactor.core.scheduler.Schedulers
import spock.lang.Specification

import java.util.concurrent.Executors

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.*

class CreateDelegationServiceCaseSpec extends Specification {

    DelegationRepository delegationRepository = Mock()
    CreateDelegationService createDelegationService = new CreateDelegationServiceImpl(Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor()), delegationRepository, Mock(MealsAdjuster))

    def 'Delegation and diet are properly saved'() {
        given: 'Delegation, checklist, country and diet'
            Delegation delegation = anyDelegation()
            Checklist checklist = anyChecklist()
            Country country = anyCountry()

        when: 'Delegation is being saved'
            createDelegationService.createDelegation(delegation, checklist, country).block()

        then: 'Delegation is properly saved'
            1 * delegationRepository.save(delegation) >> { Delegation del ->
                del == delegation
                del.checklist == checklist
                del.destinationCountry == country
                del
            }
    }
}
