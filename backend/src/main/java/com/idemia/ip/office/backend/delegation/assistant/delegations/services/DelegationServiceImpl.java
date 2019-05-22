package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationValidator;
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Country;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.entities.Meals;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
public class DelegationServiceImpl implements DelegationService {

    private final DelegationValidator delegationValidator;
    private final ExternalResourceService externalResourceService;
    private final CreateDelegationService createDelegationService;
    private final ReadDelegationService readDelegationService;
    private final UpdateDelegationService updateDelegationService;

    public DelegationServiceImpl(DelegationValidator delegationValidator,
            ExternalResourceService externalResourceService,
            CreateDelegationService createDelegationService,
            ReadDelegationService readDelegationService,
            UpdateDelegationService updateDelegationService) {
        this.delegationValidator = delegationValidator;
        this.externalResourceService = externalResourceService;
        this.createDelegationService = createDelegationService;
        this.readDelegationService = readDelegationService;
        this.updateDelegationService = updateDelegationService;
    }

    @Override
    public Mono<Delegation> addDelegation(Delegation newDelegation, User user, Long countryId) {
        newDelegation.setDelegatedEmployee(user);
        return this.getDataForNewDelegation(countryId)
                .flatMap(t -> createDelegationService.createDelegation(newDelegation, t.getT1(), t.getT2()));
    }

    @Override
    public Mono<Delegation> getDelegation(Long delegationId) {
        return readDelegationService.getDelegation(delegationId);
    }

    @Override
    public Mono<Delegation> getDelegation(Long delegationId, String delegatedEmployeeLogin) {
        return readDelegationService.getDelegation(delegationId, delegatedEmployeeLogin);
    }

    @Override
    public Mono<Delegation> getDelegationDetails(Long delegationId, Authentication authentication) {
        return this.getDelegationValidated(delegationId, authentication);
    }

    @Override
    public Mono<Delegation> updateDelegation(Delegation newDelegation, Delegation existingDelegation) {
        return updateDelegationService.flowUpdate(existingDelegation, newDelegation);
    }

    @Override
    public Mono<Meals> updateMeals(Long delegationId, Authentication authentication, Meals updatedMeals) {
        return getDelegationValidated(delegationId, authentication).flatMap(delegation ->
                updateDelegationService.updateMeals(updatedMeals,
                delegation.getMeals(),
                delegation.getStartDate(),
                delegation.getEndDate()));
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
                .flatMap(d -> externalResourceService.addExpense(newExpense, userId, delegationId, attachments)
                        .flatMap(e -> updateDelegationService.addExpense(e, d))
                );
    }

    @Override
    public Mono<Page<Expense>> getExpenses(Long delegationId,
            Integer pageNumber,
            Integer pageSize,
            List<Sort.Order> sortCriteria,
            Authentication authentication) {
        return this.getDelegationValidated(delegationId, authentication)
                .flatMap(d -> externalResourceService.getExpenses(d, pageNumber, pageSize, sortCriteria));
    }

    @Override
    public Mono<UserFile> getFile(Long delegationId, Long expenseId, Long fileId, Authentication authentication) {
        return this.getDelegationValidated(delegationId, authentication)
                .flatMap(d -> externalResourceService.getFile(expenseId, fileId));
    }

    @Override
    public Flux<Delegation> getDelegations(String userLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until) {
        return readDelegationService.getDelegations(userLogin, status, since, until);
    }

    private Delegation checkUserAccess(Delegation delegation, Authentication authentication) {
        if (!delegationValidator.validateUserAccess(delegation, authentication)) {
            throw new AccessDeniedException("User was trying to access not his delegation.");
        }
        return delegation;
    }

    private Mono<Tuple2<Checklist, Country>> getDataForNewDelegation(Long countryId) {
        Mono<Checklist> checklistMono = externalResourceService.getPreparedChecklist();
        Mono<Country> countryMono = externalResourceService.getCountry(countryId);
        return Mono.zip(checklistMono, countryMono);
    }

    @Override
    public Mono<Delegation> getDelegationValidated(Long delegationId, Authentication authentication) {
        return this.getDelegation(delegationId)
                .map(d -> checkUserAccess(d, authentication));
    }
}
