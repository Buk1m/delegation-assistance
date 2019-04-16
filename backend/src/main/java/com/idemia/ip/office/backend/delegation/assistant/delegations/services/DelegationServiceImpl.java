package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService;
import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationFlowValidator;
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.ForbiddenAccessException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.ForbiddenExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.InvalidParameterException;
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpenseService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import static com.idemia.ip.office.backend.delegation.assistant.configuration.ModelMapperConfiguration.getConfiguredModelMapper;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED;

@Service
public class DelegationServiceImpl implements DelegationService {
    private static final Logger LOG = LoggerFactory.getLogger(DelegationServiceImpl.class);

    private final Scheduler scheduler;
    private final DelegationRepository delegationRepository;
    private final ExpenseService expenseService;
    private final DelegationFlowValidator delegationFlowValidator;
    private final ForbiddenExceptionProperties forbiddenExceptionProperties;
    private final DelegationsExceptionProperties delegationsExceptionProperties;
    private final ChecklistTemplateService checklistTemplateService;
    private final ModelMapper modelMapper;

    public DelegationServiceImpl(Scheduler scheduler,
            DelegationRepository delegationRepository,
            ExpenseService expenseService,
            DelegationFlowValidator delegationFlowValidator,
            ForbiddenExceptionProperties forbiddenExceptionProperties,
            DelegationsExceptionProperties delegationsExceptionProperties,
            ChecklistTemplateService checklistTemplateService,
            ModelMapper modelMapper) {
        this.scheduler = scheduler;
        this.delegationRepository = delegationRepository;
        this.expenseService = expenseService;
        this.delegationsExceptionProperties = delegationsExceptionProperties;
        this.delegationFlowValidator = delegationFlowValidator;
        this.forbiddenExceptionProperties = forbiddenExceptionProperties;
        this.checklistTemplateService = checklistTemplateService;
        this.modelMapper = modelMapper;
    }

    @Override
    public Mono<Void> addDelegation(Delegation delegation, User user) {
        delegation.setDelegatedEmployee(user);
        delegation.setDelegationStatus(CREATED);

        return prepareChecklistForDelegation().map(preparedChecklist -> {
            delegation.setChecklist(preparedChecklist);
            return delegation;
        }).flatMap(this::saveDelegation);
    }

    @Override
    public Mono<Delegation> getDelegation(Long delegationId) {
        return Mono.fromCallable(() -> delegationRepository.findById(delegationId))
                .map(delegation -> delegation.orElseThrow(() -> delegationNotFoundException(delegationId)))
                .publishOn(scheduler);
    }

    @Override
    public Mono<Void> updateDelegation(Delegation newDelegation, Delegation existingDelegation) {
        return Mono.fromCallable(() -> updateFields(existingDelegation, newDelegation))
                .flatMap(this::saveDelegation)
                .publishOn(scheduler);
    }

    @Override
    public Mono<Delegation> validateNewStatus(Delegation newDelegation,
            Delegation existingDelegation,
            Collection<? extends GrantedAuthority> authorities) {
        return Mono.just(delegationFlowValidator.validateDelegationFlow(newDelegation, existingDelegation, authorities))
                .map(result -> {
                    if (!result) {
                        throw getForbiddenRoleAccessException(newDelegation.getDelegationStatus());
                    }
                    return existingDelegation;
                });
    }

    @Override
    public Mono<Void> addExpense(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments) {
        return this.getDelegation(delegationId)
                .doOnSuccess(d -> {
                    if (!d.getDelegatedEmployee().getId().equals(userId)) {
                        throw getForbiddenAccessException(delegationId);
                    }
                })
                .flatMap(d -> expenseService.addFiles(newExpense, userId, delegationId, attachments)
                        .map(e -> {
                            d.getExpenses().add(e);
                            return d;
                        })
                )
                .map(delegationRepository::save)
                .then();
    }

    private Delegation updateFields(Delegation existingDelegation, Delegation newDelegation) {
        getConfiguredModelMapper().map(newDelegation, existingDelegation);
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

    private Mono<Checklist> prepareChecklistForDelegation() {
        return checklistTemplateService.getChecklistTemplate()
                .map(checklistTemplate -> {
                    checklistTemplate.setId(null);
                    checklistTemplate.getActivities().forEach(activity -> activity.setId(null));
                    return checklistTemplate;
                }).map(preparedChecklistTemplate -> modelMapper.map(preparedChecklistTemplate, Checklist.class));
    }

    private void validateDates(LocalDateTime since, LocalDateTime until) {
        if (since != null && until != null && since.isAfter(until)) {
            throw invalidDatesException();
        }
    }

    private InvalidParameterException invalidDatesException() {
        LOG.trace("Invalid date was provided");
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

    private ForbiddenAccessException getForbiddenRoleAccessException(DelegationStatus delegationStatus) {
        return new ForbiddenAccessException(forbiddenExceptionProperties.getRoleHasNoAccessToResource(),
                "Your roles don't allow you to set delegation to this status: " + delegationStatus
        );
    }

    private ForbiddenAccessException getForbiddenAccessException(Long delegationId) {
        LOG.info("Uer was trying to access not his delegation by id: {}", delegationId);
        return new ForbiddenAccessException(forbiddenExceptionProperties.getNotOwnerOfResource(),
                "You can't add expenses to delegation which is not yours.");
    }
}
