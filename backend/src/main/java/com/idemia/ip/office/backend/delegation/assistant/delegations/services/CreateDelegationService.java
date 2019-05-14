package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Country;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import reactor.core.publisher.Mono;

public interface CreateDelegationService {

    Mono<Delegation> createDelegation(Delegation newDelegation, Checklist delegationChecklist, Country delegationCountry);
}
