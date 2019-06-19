package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationFlowStrategy
import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationValidator
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import spock.lang.Specification
import spock.lang.Unroll

import static com.idemia.ip.office.backend.delegation.assistant.delegations.utils.OperationType.*
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.*
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.*
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.*

class DelegationValidatorCaseSpec extends Specification {
    DelegationFlowStrategy delegationPatchStrategyApprover = Mock()
    DelegationFlowStrategy delegationPatchStrategyEmployee = Mock()
    DelegationFlowStrategy delegationPatchStrategyTravelManager = Mock()
    DelegationValidator delegationFlowStrategyContext
    String employeeRole = EMPLOYEE.name()
    String approverRole = APPROVER.name()
    String accountantRole = ACCOUNTANT.name()
    Collection<GrantedAuthority> authorities

    def setup() {
        List<DelegationFlowStrategy> patchStrategies = [
                delegationPatchStrategyApprover,
                delegationPatchStrategyEmployee,
                delegationPatchStrategyTravelManager
        ]

        delegationPatchStrategyApprover.getRoleForStatusValidation() >> APPROVER
        delegationPatchStrategyEmployee.getRoleForStatusValidation() >> EMPLOYEE
        delegationPatchStrategyTravelManager.getRoleForStatusValidation() >> TRAVEL_MANAGER

        delegationFlowStrategyContext = new DelegationValidator(patchStrategies)
        authorities = [
                new SimpleGrantedAuthority(employeeRole),
                new SimpleGrantedAuthority(approverRole),
                new SimpleGrantedAuthority(accountantRole)
        ]
    }

    def 'Validate delegation to patch if one of role is appropriate'() {
        given: 'Delegation status and user roles'
            Delegation newDelegation = anyDelegation()

        when: 'Validate delegation'
            delegationFlowStrategyContext.validateDelegationFlow(newDelegation, authorities)

        then: 'Validators are invoked'
            (0..1) * delegationPatchStrategyApprover.validate(newDelegation) >> false
            1 * delegationPatchStrategyEmployee.validate(newDelegation) >> true
            0 * delegationPatchStrategyTravelManager.validate(newDelegation)
    }

    def 'When no strategy validates delegations false is returned'() {
        given: 'Delegation status and user roles'
            Delegation newDelegation = getDelegationWithStatus(PREPARED)

        when: 'Validate delegation'
            boolean result = delegationFlowStrategyContext.validateDelegationFlow(newDelegation, authorities)

        then: 'Validators are do not validate'
            1 * delegationPatchStrategyApprover.validate(newDelegation) >> false
            1 * delegationPatchStrategyEmployee.validate(newDelegation) >> false
            0 * delegationPatchStrategyTravelManager.validate(newDelegation) >> false

            !result
    }

    @Unroll
    def 'Validating operation permissions with operation type #operationType and delegation status #delegationStatus should be allowed (#isAllowed)'() {
        given: 'Example delegation'
            Delegation delegation = Mock()

        when: 'Checking operation permissions'
            boolean isAllowedRes = delegationFlowStrategyContext.validateOperationPermissions(delegation, operationType)

        then: 'Delegation returns status'
            delegation.getDelegationStatus() >> delegationStatus

        expect: 'operation permissions result should be equals result'
            isAllowedRes == isAllowed

        where: 'Parameters'
            delegationStatus | operationType || isAllowed
            CREATED          | CREATE        || true
            CREATED          | READ          || true
            CREATED          | UPDATE        || true
            CREATED          | DELETE        || true
            CREATED          | CHANGE_STATUS || true
            NEEDS_WORK       | CREATE        || true
            NEEDS_WORK       | READ          || true
            NEEDS_WORK       | UPDATE        || true
            NEEDS_WORK       | DELETE        || true
            NEEDS_WORK       | CHANGE_STATUS || true
            CHECKED          | CREATE        || false
            CHECKED          | READ          || true
            CHECKED          | UPDATE        || false
            CHECKED          | DELETE        || false
            CHECKED          | CHANGE_STATUS || true
            PREPARED         | CREATE        || false
            PREPARED         | READ          || true
            PREPARED         | UPDATE        || false
            PREPARED         | DELETE        || false
            PREPARED         | CHANGE_STATUS || true
            FINALIZED        | CREATE        || false
            FINALIZED        | READ          || true
            FINALIZED        | UPDATE        || false
            FINALIZED        | DELETE        || false
            FINALIZED        | CHANGE_STATUS || false
    }
}
