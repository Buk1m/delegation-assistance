package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.EmployeeDelegationFlowStrategy
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.APPROVER_APPROVED
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED
import static com.idemia.ip.office.backend.delegation.assistant.utils.DelegationTestUtils.getDelegationWithStatus

class EmployeeDelegationFlowStrategyCaseSpec extends Specification {
    EmployeeDelegationFlowStrategy employeeDelegationPatchStrategy = new EmployeeDelegationFlowStrategy()

    def 'EmployeeDelegationPatchStrategy validates delegation'() {
        given: 'Delegation with appropriate status'
            Delegation delegation = getDelegationWithStatus(PREPARED)

        when: 'EmployeeDelegationFlowStrategy validate'
            boolean result = employeeDelegationPatchStrategy.validate(delegation)

        then: 'Delegation is validated'
            result
    }

    def 'EmployeeDelegationPatchStrategy do not validate delegation'() {
        given: 'Delegation with inappropriate status'
            Delegation delegation = getDelegationWithStatus(APPROVER_APPROVED)

        when: 'EmployeeDelegationFlowStrategy validate'
            boolean result = employeeDelegationPatchStrategy.validate(delegation)

        then: 'Delegation is not validated'
            !result
    }
}
