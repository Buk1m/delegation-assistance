package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import reactor.core.publisher.Mono;

public interface UpdateDelegationService {
    Mono<Delegation> flowUpdate(Delegation existingDelegation, Delegation newDelegation);

    Mono<Expense> addExpense(Expense e, Delegation d);
}
