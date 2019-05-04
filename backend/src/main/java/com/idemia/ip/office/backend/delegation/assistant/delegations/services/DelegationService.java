package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface DelegationService {
    Mono<Delegation> addDelegation(Delegation delegation, User name);

    Mono<Delegation> getDelegation(Long delegationId);

    Flux<Delegation> getDelegations(String userLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until);

    Mono<Delegation> getDelegation(Long delegationId, String delegatedEmployeeLogin);

    Mono<Delegation> updateDelegation(Delegation updateDelegation, Delegation existingDelegation);

    Mono<Delegation> validateNewStatus(Delegation newDelegation,
            Delegation existingDelegation,
            Collection<? extends GrantedAuthority> authorities);

    Mono<Expense> addExpense(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments);

    Mono<Page<Expense>> getExpenses(Long delegationId,
            Integer pageNumber,
            Integer pageSize,
            List<Sort.Order> sortCriteria,
            Authentication authentication);

    Mono<UserFile> getFile(Long delegationId, Long expenseId, Long fileId, Authentication authentication);
}
