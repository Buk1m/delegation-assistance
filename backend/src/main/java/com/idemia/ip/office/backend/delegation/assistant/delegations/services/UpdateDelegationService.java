package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.entities.Meals;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

public interface UpdateDelegationService {
    Mono<Delegation> statusUpdate(Delegation existingDelegation, Delegation newDelegation);

    Mono<Expense> addExpense(Expense e, Delegation d);

    Mono<Meals> updateMeals(Meals updatedMeals,
            Meals oldMeals,
            LocalDateTime delegationStartDate,
            LocalDateTime delegationEndDate);
}
