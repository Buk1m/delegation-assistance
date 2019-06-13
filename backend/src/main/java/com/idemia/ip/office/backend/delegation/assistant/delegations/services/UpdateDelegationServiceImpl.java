package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.MealsRepository;
import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.MealsAdjuster;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.entities.Meals;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
public class UpdateDelegationServiceImpl implements UpdateDelegationService {

    private final DelegationRepository delegationRepository;
    private final MealsRepository mealsRepository;
    private final MealsAdjuster mealsAdjuster;
    private final ModelMapper notNullPropertyMapper;

    public UpdateDelegationServiceImpl(DelegationRepository delegationRepository,
            MealsRepository mealsRepository,
            MealsAdjuster mealsAdjuster,
            @Qualifier("notNullProperty") ModelMapper notNullPropertyMapper) {
        this.delegationRepository = delegationRepository;
        this.mealsRepository = mealsRepository;
        this.mealsAdjuster = mealsAdjuster;
        this.notNullPropertyMapper = notNullPropertyMapper;
    }

    @Override
    public Mono<Delegation> statusUpdate(Delegation existingDelegation, Delegation newDelegation) {
        notNullPropertyMapper.map(newDelegation, existingDelegation);
        return Mono.fromCallable(() -> delegationRepository.save(existingDelegation));
    }

    @Override
    public Mono<Expense> addExpense(Expense expense, Delegation delegation) {
        delegation.getExpenses().add(expense);
        return Mono.fromCallable(() -> delegationRepository.save(delegation))
                .map(d -> expense);
    }

    @Override
    public Mono<Meals> updateMeals(Meals updatedMeals,
            Meals oldMeals,
            LocalDateTime delegationStartDate,
            LocalDateTime delegationEndDate) {
            if(updatedMeals == null) {
                updatedMeals = new Meals();
            }

            notNullPropertyMapper.map(updatedMeals, oldMeals);
        mealsAdjuster.adjustNumberOfMeals(oldMeals, delegationStartDate, delegationEndDate);
        return Mono.fromCallable(() -> mealsRepository.save(oldMeals));
    }
}
