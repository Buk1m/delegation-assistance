package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.OperationType;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.idemia.ip.office.backend.delegation.assistant.delegations.utils.OperationType.CHANGE_STATUS;
import static com.idemia.ip.office.backend.delegation.assistant.delegations.utils.OperationType.READ;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.FINALIZED;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.NEEDS_WORK;
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.ACCOUNTANT;
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.APPROVER;
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.TRAVEL_MANAGER;
import static com.idemia.ip.office.backend.delegation.assistant.utils.AuthoritiesToRolesMapper.mapAuthoritiesToRoles;

@Component
public class DelegationValidator {

    private final Map<Role, DelegationFlowStrategy> delegationPatchStrategies;

    public DelegationValidator(List<DelegationFlowStrategy> delegationPatchStrategies) {
        this.delegationPatchStrategies = delegationPatchStrategies.stream()
                .collect(Collectors.toMap(DelegationFlowStrategy::getRoleForStatusValidation, Function.identity()));
    }

    public Boolean validateDelegationFlow(Delegation newDelegation,
            Collection<? extends GrantedAuthority> grantedAuthorities) {
        return mapAuthoritiesToRoles(grantedAuthorities).stream()
                .map(delegationPatchStrategies::get)
                .filter(Objects::nonNull)
                .anyMatch(dps -> dps.validate(newDelegation));
    }

    public boolean validateUserAccess(Delegation existingDelegation,
            Authentication authentication,
            OperationType operationType) {
        List<Role> roles = mapAuthoritiesToRoles(authentication.getAuthorities());
        return operationType == READ || operationType == CHANGE_STATUS ?
                (hasPrivilegedRole(roles) || isOwner(existingDelegation, authentication)) :
                isOwner(existingDelegation, authentication);
    }

    public boolean validateOperationPermissions(Delegation delegation, OperationType operationType) {
        if (OperationType.CHANGE_STATUS == operationType && delegation.getDelegationStatus() == FINALIZED) {
            return false;
        }
        return operationType == READ ||
                operationType == CHANGE_STATUS ||
                delegationHasPrivilegedStatus(delegation);
    }

    private boolean hasPrivilegedRole(List<Role> roles) {
        return roles.contains(TRAVEL_MANAGER) ||
                roles.contains(APPROVER) ||
                roles.contains(ACCOUNTANT);
    }

    private boolean isOwner(Delegation delegation, Authentication authentication) {
        return delegation.getDelegatedEmployee()
                .getLogin()
                .equals(authentication.getName());
    }

    private boolean delegationHasPrivilegedStatus(Delegation delegation) {
        return delegation.getDelegationStatus().equals(CREATED) ||
                delegation.getDelegationStatus().equals(NEEDS_WORK);
    }
}
