package com.idemia.ip.office.backend.delegation.assistant.utils


import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus

import java.time.LocalDateTime

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED

class DelegationTestUtils {
    static DelegationDto anyDelegationDTO() {
        DelegationDto.builder()
                .delegationObjective('Objective')
                .destinationLocation('Radom')
                .destinationCountryISO3('tst')
                .startDate(LocalDateTime.parse('2020-01-01T01:01:01'))
                .endDate(LocalDateTime.parse('2020-01-03T01:01:01'))
                .build()
    }

    static Delegation getDelegationWithStatus(DelegationStatus delegationStatus) {
        Delegation.builder()
                .delegationStatus(delegationStatus)
                .build()
    }

    static Delegation anyDelegation() {
        return Delegation.builder()
                .delegationStatus(CREATED)
                .delegationObjective('Test')
                .destinationLocation('Radom')
                .destinationCountryISO3('iso')
                .startDate(LocalDateTime.parse('2020-01-01T01:01:01'))
                .endDate(LocalDateTime.parse('2020-01-03T01:01:01'))
                .build()
    }
}
