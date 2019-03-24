package com.idemia.ip.office.backend.delegation.assistant.delegations.services;


import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import reactor.core.publisher.Mono;

public interface DelegationService {
    Mono<Void> addDelegation(Delegation delegation, User name);
}
