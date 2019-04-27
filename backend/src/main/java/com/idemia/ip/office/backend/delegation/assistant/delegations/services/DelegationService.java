package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import org.springframework.http.codec.multipart.FilePart;
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

}
