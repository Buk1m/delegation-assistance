package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DietRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Diet;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.time.LocalDateTime;

@Service
public class ReadDelegationServiceImpl implements ReadDelegationService {

    private static final Logger LOG = LoggerFactory.getLogger(ReadDelegationServiceImpl.class);

    private final Scheduler scheduler;
    private final DelegationRepository delegationRepository;
    private final DelegationsExceptionProperties delegationsExceptionProperties;

    public ReadDelegationServiceImpl(Scheduler scheduler,
            DelegationRepository delegationRepository,
            DelegationsExceptionProperties delegationsExceptionProperties) {
        this.scheduler = scheduler;
        this.delegationRepository = delegationRepository;
        this.delegationsExceptionProperties = delegationsExceptionProperties;
    }

    @Override
    public Mono<Delegation> getDelegation(Long delegationId) {
        return Mono.fromCallable(() -> delegationRepository.findById(delegationId))
                .map(delegation -> delegation.orElseThrow(() -> delegationNotFoundException(delegationId)))
                .publishOn(scheduler);
    }

    @Override
    public Flux<Delegation> getDelegations(String userLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until) {
        return Mono.fromCallable(() -> this.delegationRepository.getDelegations(userLogin, status, since, until))
                .publishOn(scheduler)
                .flatMapMany(Flux::fromIterable);
    }

    private EntityNotFoundException delegationNotFoundException(Long id) {
        LOG.info("Delegation with id {} hasn't been found.", id);
        return new EntityNotFoundException(
                "Delegation not found.",
                delegationsExceptionProperties.getDelegationNotFound(),
                Delegation.class
        );
    }
}
