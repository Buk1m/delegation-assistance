package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class DelegationFlowValidator {
    private final Map<Role, DelegationFlowStrategy> delegationPatchStrategies;

    public DelegationFlowValidator(List<DelegationFlowStrategy> delegationPatchStrategies) {
        this.delegationPatchStrategies = delegationPatchStrategies.stream()
                .collect(Collectors.toMap(DelegationFlowStrategy::getRoleValidates, Function.identity()));
    }

    public Boolean validateDelegationFlow(
            Delegation newDelegation,
            Collection<? extends GrantedAuthority> grantedAuthorities) {
        return mapAuthoritiesToRoles(grantedAuthorities).stream()
                .map(delegationPatchStrategies::get)
                .filter(Objects::nonNull)
                .anyMatch(dps -> dps.validate(newDelegation));
    }

    private List<Role> mapAuthoritiesToRoles(Collection<? extends GrantedAuthority> grantedAuthorities) {
        return grantedAuthorities.stream()
                .map(authority -> Role.valueOf(authority.getAuthority()
                        .replace("ROLE_", "")
                        .toUpperCase()))
                .collect(Collectors.toList());
    }
}
