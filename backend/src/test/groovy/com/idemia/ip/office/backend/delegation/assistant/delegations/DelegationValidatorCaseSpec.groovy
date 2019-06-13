package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationFlowStrategy
import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationValidator
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.exceptions.ApplicationException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.*
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.*

class DelegationValidatorCaseSpec extends Specification {
    DelegationFlowStrategy delegationPatchStrategyApprover = Mock()
    DelegationFlowStrategy delegationPatchStrategyEmployee = Mock()
    DelegationFlowStrategy delegationPatchStrategyTravelManager = Mock()
    DelegationsExceptionProperties delegationsExceptionProperties = Mock()
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

        delegationFlowStrategyContext = new DelegationValidator(patchStrategies, delegationsExceptionProperties)
        authorities = [
                new SimpleGrantedAuthority(employeeRole),
                new SimpleGrantedAuthority(approverRole),
                new SimpleGrantedAuthority(accountantRole)
        ]
    }

    def 'Validate delegation to patch if one of role is appropriate'() {
        given: 'Delegation status and user roles'
            Delegation delegation = getDelegationWithStatus(PREPARED)
            Delegation newDelegation = anyDelegation()
            delegation.expenses = [anyExpense()]

        when: 'Validate delegation'
            delegationFlowStrategyContext.validateDelegationFlow(newDelegation, delegation, authorities)

        then: 'Validators are invoked'
            (0..1) * delegationPatchStrategyApprover.validate(newDelegation) >> false
            1 * delegationPatchStrategyEmployee.validate(newDelegation) >> true
            0 * delegationPatchStrategyTravelManager.validate(newDelegation)
    }

    def 'When no strategy validates delegations false is returned'() {
        given: 'Delegation status and user roles'
            Delegation newDelegation = getDelegationWithStatus(PREPARED)
            Delegation delegation = anyDelegation()
            delegation.expenses = [anyExpense()]

        when: 'Validate delegation'
            boolean result = delegationFlowStrategyContext.validateDelegationFlow(newDelegation, delegation, authorities)

        then: 'Validators are do not validate'
            1 * delegationPatchStrategyApprover.validate(newDelegation) >> false
            1 * delegationPatchStrategyEmployee.validate(newDelegation) >> false
            0 * delegationPatchStrategyTravelManager.validate(newDelegation) >> false

            !result
    }

    def 'Validator throws exception if delegation has not have expenses'() {
        given: 'Delegation without expenses'
            Delegation newDelegation = getDelegationWithStatus(PREPARED)
            Delegation delegation = anyDelegation()
            delegation.expenses = []

        when: 'Validate delegation'
            delegationFlowStrategyContext.validateDelegationFlow(newDelegation, delegation, authorities)

        then: 'Exception is thrown'
            delegationsExceptionProperties.getNoExpenses() >> 'Test'
            thrown(ApplicationException)
    }
}
