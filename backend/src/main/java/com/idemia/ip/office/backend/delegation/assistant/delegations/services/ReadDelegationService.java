package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

public interface ReadDelegationService {

    Mono<Delegation> getDelegation(Long delegationId);

    Flux<Delegation> getDelegations(String userLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until);
}
