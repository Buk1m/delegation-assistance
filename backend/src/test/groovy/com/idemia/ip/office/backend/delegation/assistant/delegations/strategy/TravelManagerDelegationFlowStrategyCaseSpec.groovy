package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import spock.lang.Specification
import spock.lang.Unroll

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.APPROVED
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CHECKED
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.FINALIZED
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.NEEDS_WORK
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getDelegationToValidate

class TravelManagerDelegationFlowStrategyCaseSpec extends Specification {
    TravelManagerDelegationFlowStrategy managerDelegationFlowStrategy = new TravelManagerDelegationFlowStrategy()

    @Unroll
    def 'EmployeeDelegationFlowStrategy do not validate delegation'(Delegation newDelegation, boolean result) {
        expect: 'Validation works'
            managerDelegationFlowStrategy.validate(newDelegation) == result

        where: 'Delegation parameters cases'
            newDelegation                       || result
            getDelegationToValidate(CREATED)    || false
            getDelegationToValidate(NEEDS_WORK) || true
            getDelegationToValidate(CHECKED)    || true
            getDelegationToValidate(APPROVED)    || true
            getDelegationToValidate(PREPARED)    || true
            getDelegationToValidate(FINALIZED)    || false
    }
}
