package com.idemia.ip.office.backend.delegation.assistant.utils;

import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AuthoritiesToRolesMapper {
    public static List<Role> mapAuthoritiesToRoles(Collection<? extends GrantedAuthority> grantedAuthorities) {
        return grantedAuthorities.stream()
                .map(authority -> Role.valueOf(authority.getAuthority()
                        .replace("ROLE_", "")
                        .toUpperCase()))
                .collect(Collectors.toList());
    }
}
