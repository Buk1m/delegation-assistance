package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationFlowStrategy
import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationFlowValidator
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.RATIFIED
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.*
import static com.idemia.ip.office.backend.delegation.assistant.utils.DelegationTestUtils.getDelegationWithStatus

class DelegationFlowValidatorCaseSpec extends Specification {
    DelegationFlowStrategy delegationPatchStrategyApprover = Mock()
    DelegationFlowStrategy delegationPatchStrategyEmployee = Mock()
    DelegationFlowStrategy delegationPatchStrategyTravelManager = Mock()
    DelegationFlowValidator delegationPatchStrategyContext
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

        delegationPatchStrategyApprover.getRoleValidates() >> APPROVER
        delegationPatchStrategyEmployee.getRoleValidates() >> EMPLOYEE
        delegationPatchStrategyTravelManager.getRoleValidates() >> TRAVEL_MANAGER

        delegationPatchStrategyContext = new DelegationFlowValidator(patchStrategies)
        authorities = [
                new SimpleGrantedAuthority(employeeRole),
                new SimpleGrantedAuthority(approverRole),
                new SimpleGrantedAuthority(accountantRole)
        ]
    }

    def 'Validate delegation to patch if one of role is appropriate'() {
        given: 'Delegation status and user roles'
            Delegation delegation = getDelegationWithStatus(PREPARED)

        when: 'Validate delegation'
            delegationPatchStrategyContext.validateDelegationFlow(delegation, authorities)

        then: 'Validators are invoked'
            (0..1) * delegationPatchStrategyApprover.validate(delegation) >> false
            1 * delegationPatchStrategyEmployee.validate(delegation) >> true
            0 * delegationPatchStrategyTravelManager.validate(delegation)
    }

    def 'When no strategy validates delegations false is returned'() {
        given: 'Delegation status and user roles'
            Delegation delegation = getDelegationWithStatus(RATIFIED)

        when: 'Validate delegation'
            boolean result = delegationPatchStrategyContext.validateDelegationFlow(delegation, authorities)

        then: 'Validators are do not validate'
            1 * delegationPatchStrategyApprover.validate(delegation) >> false
            1 * delegationPatchStrategyEmployee.validate(delegation) >> false
            0 * delegationPatchStrategyTravelManager.validate(delegation) >> false

            !result
    }
}
