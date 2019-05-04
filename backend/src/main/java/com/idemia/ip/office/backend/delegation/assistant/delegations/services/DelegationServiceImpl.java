package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService;
import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationValidator;
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpenseService;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED;

@Service
public class DelegationServiceImpl implements DelegationService {
    private static final Logger LOG = LoggerFactory.getLogger(DelegationServiceImpl.class);

    private final Scheduler scheduler;
    private final DelegationRepository delegationRepository;
    private final ExpenseService expenseService;
    private final DelegationValidator delegationValidator;
    private final DelegationsExceptionProperties delegationsExceptionProperties;
    private final ChecklistTemplateService checklistTemplateService;
    private final ModelMapper modelMapper;

    public DelegationServiceImpl(Scheduler scheduler,
            DelegationRepository delegationRepository,
            ExpenseService expenseService,
            DelegationValidator delegationValidator,
            DelegationsExceptionProperties delegationsExceptionProperties,
            ChecklistTemplateService checklistTemplateService,
            @Qualifier("byteArray2Base64") ModelMapper modelMapper) {
        this.scheduler = scheduler;
        this.delegationRepository = delegationRepository;
        this.expenseService = expenseService;
        this.delegationsExceptionProperties = delegationsExceptionProperties;
        this.delegationValidator = delegationValidator;
        this.checklistTemplateService = checklistTemplateService;
        this.modelMapper = modelMapper;
    }

    @Override
    public Mono<Delegation> addDelegation(Delegation delegation, User user) {
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
    public Mono<Delegation> getDelegation(Long delegationId, String delegatedEmployeeLogin) {
        return Mono.fromCallable(() -> delegationRepository.findByIdAndDelegatedEmployeeLogin(delegationId,
                delegatedEmployeeLogin))
                .publishOn(scheduler)
                .map(d -> d.orElseThrow(() -> userDelegationNotFoundException(delegationId, delegatedEmployeeLogin)));
    }

    @Override
    public Mono<Delegation> updateDelegation(Delegation newDelegation, Delegation existingDelegation) {
        return Mono.fromCallable(() -> updateFields(existingDelegation, newDelegation))
                .flatMap(this::saveDelegation)
                .publishOn(scheduler);
    }

    @Override
    public Mono<Delegation> validateNewStatus(Delegation newDelegation,
            Delegation existingDelegation,
            Collection<? extends GrantedAuthority> authorities) {
        return Mono.just(delegationValidator.validateDelegationFlow(newDelegation, existingDelegation, authorities))
                .map(result -> {
                    if (!result) {
                        throw new AccessDeniedException("User was trying to access not his delegation.");
                    }
                    return existingDelegation;
                });
    }

    @Override
    public Mono<Expense> addExpense(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments) {
        return this.getDelegation(delegationId)
                .doOnSuccess(d -> {
                    if (!d.getDelegatedEmployee().getId().equals(userId)) {
                        throw new AccessDeniedException("User was trying to access not his delegation.");
                    }
                })
                .flatMap(d -> expenseService.addFiles(newExpense, userId, delegationId, attachments)
                        .flatMap(e -> assignExpense(e, d))
                );
    }

    private Mono<Expense> assignExpense(Expense expense, Delegation delegation) {
        delegation.getExpenses().add(expense);
        return Mono.fromCallable(() -> delegationRepository.save(delegation))
                .map(d -> expense);
    }

    @Override
    public Mono<Page<Expense>> getExpenses(Long delegationId,
            Integer pageNumber,
            Integer pageSize,
            List<Sort.Order> sortCriteria, Authentication authentication) {
        return this.getDelegation(delegationId)
                .map(d -> checkUserAccess(d, authentication))
                .flatMap(d -> expenseService.getExpenses(d, pageNumber, pageSize, sortCriteria));
    }

    @Override
    public Mono<UserFile> getFile(Long delegationId, Long expenseId, Long fileId, Authentication authentication) {
        return getDelegation(delegationId)
                .map(d -> checkUserAccess(d, authentication))
                .flatMap(d -> expenseService.getFile(expenseId, fileId));
    }

    private Delegation checkUserAccess(Delegation delegation, Authentication authentication) {
        if (!delegationValidator.validateUserAccess(delegation, authentication)) {
            throw new AccessDeniedException("User was trying to access not his delegation.");
        }
        return delegation;
    }

    private Delegation updateFields(Delegation existingDelegation, Delegation newDelegation) {
        modelMapper.map(newDelegation, existingDelegation);
        return existingDelegation;
    }

    private Mono<Delegation> saveDelegation(Delegation delegation) {
        return Mono.fromCallable(() -> delegationRepository.save(delegation));
    }

    public Flux<Delegation> getDelegations(String userLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until) {
        this.delegationValidator.validateDates(since, until);
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

    private EntityNotFoundException delegationNotFoundException(Long id) {
        LOG.info("Delegation with id {} hasn't been found.", id);
        return new EntityNotFoundException(
                "Delegation not found.",
                delegationsExceptionProperties.getDelegationNotFound(),
                Delegation.class
        );
    }

    private EntityNotFoundException userDelegationNotFoundException(Long delegationId, String delegatedEmployeeLogin) {
        LOG.info("Delegation with id {} and user {} hasn't been found.", delegationId, delegatedEmployeeLogin);
        return new EntityNotFoundException(
                "Delegation not found.",
                delegationsExceptionProperties.getDelegationNotFound(),
                Delegation.class
        );
    }
}
