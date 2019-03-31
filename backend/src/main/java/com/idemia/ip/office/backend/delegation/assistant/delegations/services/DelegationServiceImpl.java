package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.*;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.InvalidParameterException;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Scheduler;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DelegationServiceImpl implements DelegationService {

    private final Scheduler scheduler;
    private final DelegationRepository delegationRepository;
    private final DelegationsExceptionProperties delegationsExceptionProperties;

    public DelegationServiceImpl(Scheduler scheduler,
            DelegationRepository delegationRepository,
            DelegationsExceptionProperties delegationsExceptionProperties) {
        this.scheduler = scheduler;
        this.delegationRepository = delegationRepository;
        this.delegationsExceptionProperties = delegationsExceptionProperties;
    }

    @Override
    public Mono<Void> addDelegation(Delegation delegation, User user) {
        delegation.setDelegatedEmployee(user);
        delegation.setDelegationStatus(CREATED);
        return Mono.fromRunnable(() -> delegationRepository.save(delegation));
    }

    public Flux<Delegation> getDelegations(String userLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until) {
        this.validateDates(since, until);
        Mono<List<Delegation>> delegationList = Mono.fromCallable(() ->
                this.delegationRepository.getDelegations(userLogin, status, since, until)
        ).publishOn(scheduler);
        return delegationList.flatMapMany(Flux::fromIterable);
    }

    private void validateDates(LocalDateTime since, LocalDateTime until) {
        if (since != null && until != null && since.isAfter(until)) {
            throw invalidDatesException();
        }
    }

    private InvalidParameterException invalidDatesException() {
        return new InvalidParameterException(
                "Invalid since and until parameters! Since date must be earlier than until date!",
                delegationsExceptionProperties.getSinceDateMustBeEarlierThanUntilDate());
    }
}
