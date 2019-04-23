package com.idemia.ip.office.backend.delegation.assistant.utils;

import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.security.core.GrantedAuthority;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static com.idemia.ip.office.backend.delegation.assistant.utils.AuthoritiesToRolesMapper.mapAuthoritiesToRoles;

public class RolesService {

    public static List<Role> travelManagerApproverAccoutant = Arrays.asList(Role.TRAVEL_MANAGER,
            Role.APPROVER,
            Role.ACCOUNTANT);

    public static boolean hasAnyRole(Collection<? extends GrantedAuthority> grantedAuthorities, List<Role> roles) {
        return mapAuthoritiesToRoles(grantedAuthorities)
                .stream()
                .anyMatch(roles::contains);
    }
}
