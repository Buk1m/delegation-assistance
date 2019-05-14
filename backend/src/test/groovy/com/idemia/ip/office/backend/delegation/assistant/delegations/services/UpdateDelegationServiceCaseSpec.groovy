package com.idemia.ip.office.backend.delegation.assistant.delegations.services

import com.idemia.ip.office.backend.delegation.assistant.configuration.ModelMapperConfiguration
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegation

class UpdateDelegationServiceCaseSpec extends Specification {

    DelegationRepository delegationRepository = Mock()

    UpdateDelegationService updateDelegationService = new UpdateDelegationServiceImpl(
            delegationRepository,
            new ModelMapperConfiguration().getModelMapperPropertyConditionNotNull()
    )

    def 'Flow status is properly mapped'() {
        given: 'New status and existing delegation'
            Delegation delegation = anyDelegation()
            Delegation newStatusDelegation = new Delegation([delegationStatus: CREATED])

        when: 'Delegation is updated'
            updateDelegationService.flowUpdate(delegation, newStatusDelegation).block()

        then: 'Status is properly mapped'
            delegation.delegationStatus == newStatusDelegation.delegationStatus
            delegationRepository.save(delegation) >> delegation

        and: 'Other properties are not mapped'
            delegation.destinationLocation != newStatusDelegation.destinationLocation
            delegation.delegationObjective != newStatusDelegation.delegationObjective
            delegation.startDate != newStatusDelegation.startDate
            delegation.endDate != newStatusDelegation.endDate
            delegation.advancePayment != newStatusDelegation.advancePayment
    }
}
