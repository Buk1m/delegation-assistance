package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.MealsAdjuster;
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Country;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED;

@Service
public class CreateDelegationServiceImpl implements CreateDelegationService {

    private final Scheduler scheduler;
    private final DelegationRepository delegationRepository;
    private final MealsAdjuster mealsAdjuster;

    public CreateDelegationServiceImpl(Scheduler scheduler,
            DelegationRepository delegationRepository,
            MealsAdjuster mealsAdjuster) {
        this.scheduler = scheduler;
        this.delegationRepository = delegationRepository;
        this.mealsAdjuster = mealsAdjuster;
    }

    @Override
    public Mono<Delegation> createDelegation(Delegation newDelegation,
            Checklist checklist,
            Country country) {

        return this.prepareDelegation(newDelegation, checklist, country)
                .map(delegationRepository::save)
                .publishOn(scheduler);
    }

    private Mono<Delegation> prepareDelegation(Delegation newDelegation, Checklist checklist, Country country) {
        newDelegation.setDestinationCountry(country);
        newDelegation.setChecklist(checklist);
        newDelegation.setDelegationStatus(CREATED);
        mealsAdjuster.adjustNumberOfMeals(newDelegation.getMeals(),
                newDelegation.getStartDate(),
                newDelegation.getEndDate());
        return Mono.just(newDelegation);
    }
}
