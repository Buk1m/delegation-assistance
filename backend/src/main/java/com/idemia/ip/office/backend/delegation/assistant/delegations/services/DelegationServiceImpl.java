package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.*;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class DelegationServiceImpl implements DelegationService {

    private final DelegationRepository delegationRepository;

    public DelegationServiceImpl(DelegationRepository delegationRepository) {
        this.delegationRepository = delegationRepository;
    }

    @Override
    public Mono<Void> addDelegation(Delegation delegation, User user) {
        delegation.setDelegatedEmployee(user);
        delegation.setDelegationStatus(CREATED);
        return Mono.fromRunnable(() -> delegationRepository.save(delegation));
    }
}
