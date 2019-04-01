package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationFlowValidator;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.ForbiddenAccessException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.ForbiddenExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.InvalidParameterException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED;
import static org.modelmapper.Conditions.isNotNull;

@Service
public class DelegationServiceImpl implements DelegationService {
    private static final Logger LOG = LoggerFactory.getLogger(DelegationServiceImpl.class);

    private final Scheduler scheduler;

    private final DelegationRepository delegationRepository;

    private final DelegationFlowValidator delegationFlowValidator;
    private final ModelMapper modelMapper;

    private final ForbiddenExceptionProperties forbiddenExceptionProperties;
    private final DelegationsExceptionProperties delegationsExceptionProperties;

    public DelegationServiceImpl(Scheduler scheduler,
            DelegationRepository delegationRepository,
            DelegationFlowValidator delegationFlowValidator,
            ForbiddenExceptionProperties forbiddenExceptionProperties,
            DelegationsExceptionProperties delegationsExceptionProperties) {
        this.scheduler = scheduler;
        this.delegationRepository = delegationRepository;
        this.delegationsExceptionProperties = delegationsExceptionProperties;
        this.modelMapper = configureModelMapper();
        this.delegationFlowValidator = delegationFlowValidator;
        this.forbiddenExceptionProperties = forbiddenExceptionProperties;
    }

    @Override
    public Mono<Void> addDelegation(Delegation delegation, User user) {
        delegation.setDelegatedEmployee(user);
        delegation.setDelegationStatus(CREATED);
        return saveDelegation(delegation);
    }

    @Override
    public Mono<Void> updateDelegation(Long delegationId, Delegation patchDelegation) {
        return Mono.fromCallable(() -> delegationRepository.findById(delegationId))
                .map(d -> d.orElseThrow(() -> delegationNotFoundException(delegationId)))
                .publishOn(scheduler)
                .map(d -> updateFields(d, patchDelegation))
                .flatMap(this::saveDelegation)
                .publishOn(scheduler);
    }

    @Override
    public Mono<Boolean> validateNewStatus(Delegation delegationToValidate,
            Collection<? extends GrantedAuthority> authorities) {
        return Mono.just(delegationFlowValidator.validateDelegationFlow(delegationToValidate, authorities))
                .map(result -> {
                    if (!result) {
                        throw getForbiddenAccessException(delegationToValidate.getDelegationStatus());
                    }
                    return result;
                });
    }

    private Delegation updateFields(Delegation existingDelegation, Delegation newDelegation) {
        modelMapper.map(newDelegation, existingDelegation);
        return existingDelegation;
    }

    private Mono<Void> saveDelegation(Delegation delegation) {
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

    private EntityNotFoundException delegationNotFoundException(Long id) {
        LOG.info("Delegation with id {} hasn't been found.", id);
        return new EntityNotFoundException(
                "Delegation not found.",
                delegationsExceptionProperties.getDelegationNotFound(),
                Delegation.class
        );
    }

    private ForbiddenAccessException getForbiddenAccessException(DelegationStatus delegationStatus) {
        return new ForbiddenAccessException(forbiddenExceptionProperties.getRoleHasNoAccessToResource(),
                "Your roles don't allow you to set delegation to this status: " + delegationStatus
        );
    }

    private static ModelMapper configureModelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setPropertyCondition(isNotNull());
        return modelMapper;
    }
}
