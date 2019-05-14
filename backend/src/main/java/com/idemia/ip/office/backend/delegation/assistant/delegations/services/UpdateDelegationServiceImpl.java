package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UpdateDelegationServiceImpl implements UpdateDelegationService {

    private final DelegationRepository delegationRepository;
    private final ModelMapper notNullPropertyMapper;

    public UpdateDelegationServiceImpl(DelegationRepository delegationRepository,
            @Qualifier("notNullProperty") ModelMapper notNullPropertyMapper) {
        this.delegationRepository = delegationRepository;
        this.notNullPropertyMapper = notNullPropertyMapper;
    }

    @Override
    public Mono<Delegation> flowUpdate(Delegation existingDelegation, Delegation newDelegation) {
        notNullPropertyMapper.map(newDelegation, existingDelegation);
        return Mono.fromCallable(() -> delegationRepository.save(existingDelegation));
    }

    @Override
    public Mono<Expense> addExpense(Expense expense, Delegation delegation) {
        delegation.getExpenses().add(expense);
        return Mono.fromCallable(() -> delegationRepository.save(delegation))
                .map(d -> expense);
    }
}
