package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.EmployeeDelegationFlowStrategy
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import spock.lang.Specification
import spock.lang.Unroll

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.*
import static com.idemia.ip.office.backend.delegation.assistant.utils.DelegationTestUtils.getDelegationToValidate

class EmployeeDelegationFlowStrategyCaseSpec extends Specification {
    EmployeeDelegationFlowStrategy employeeDelegationFlowStrategy = new EmployeeDelegationFlowStrategy()

    @Unroll
    def 'EmployeeDelegationFlowStrategy do not validate delegation'(Delegation newDelegation, boolean result) {
        expect: 'Validation works'
            employeeDelegationFlowStrategy.validate(newDelegation) == result

        where: 'Delegation parameters cases'
            newDelegation                     | result
            getDelegationToValidate(CREATED)  | true
            getDelegationToValidate(PREPARED) | true
            getDelegationToValidate(APPROVED) | false
    }
}
