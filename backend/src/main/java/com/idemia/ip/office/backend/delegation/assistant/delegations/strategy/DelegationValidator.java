package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

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

    public boolean validateUserAccess(Delegation existingDelegation, Authentication authentication) {
        List<Role> roles = mapAuthoritiesToRoles(authentication.getAuthorities());
        return hasPrivilegedRole(roles) || existingDelegation.getDelegatedEmployee()
                .getLogin()
                .equals(authentication.getName());
    }

    private boolean hasPrivilegedRole(List<Role> roles) {
        return roles.contains(TRAVEL_MANAGER) ||
                roles.contains(APPROVER) ||
                roles.contains(ACCOUNTANT);
    }
}
