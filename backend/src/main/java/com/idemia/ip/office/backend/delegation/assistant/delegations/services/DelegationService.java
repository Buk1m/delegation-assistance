package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import org.springframework.security.core.GrantedAuthority;
import reactor.core.publisher.Mono;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

import java.util.Collection;

public interface DelegationService {
    Mono<Void> addDelegation(Delegation delegation, User name);

    Flux<Delegation> getDelegations(String userLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until);
    Mono<Void> updateDelegation(Long delegationId, Delegation patchDelegation);

    Mono<Boolean> validateNewStatus(Delegation updateDelegation, Collection<? extends GrantedAuthority> authorities);
}
