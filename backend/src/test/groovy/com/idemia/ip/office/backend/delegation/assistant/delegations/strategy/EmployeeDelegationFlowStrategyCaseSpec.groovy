package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy

import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.EmployeeDelegationFlowStrategy
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import spock.lang.Specification
import spock.lang.Unroll

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.*
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getDelegationToValidate

class EmployeeDelegationFlowStrategyCaseSpec extends Specification {
    EmployeeDelegationFlowStrategy employeeDelegationFlowStrategy = new EmployeeDelegationFlowStrategy()

    @Unroll
    def 'EmployeeDelegationFlowStrategy do not validate delegation'(Delegation newDelegation, boolean result) {
        expect: 'Validation works'
            employeeDelegationFlowStrategy.validate(newDelegation) == result

        where: 'Delegation parameters cases'
            newDelegation                     || result
            getDelegationToValidate(CREATED)    || true
            getDelegationToValidate(NEEDS_WORK) || false
            getDelegationToValidate(CHECKED)    || false
            getDelegationToValidate(APPROVED)    || false
            getDelegationToValidate(PREPARED)    || true
            getDelegationToValidate(FINALIZED)    || false
    }
}
