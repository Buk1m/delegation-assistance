package com.idemia.ip.office.backend.delegation.assistant.delegations.repositories;

import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.DelegationQueryBuilder;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

public class DelegationRepositoryCustomImpl implements DelegationRepositoryCustom {

    private EntityManager entityManager;

    public DelegationRepositoryCustomImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Delegation> getDelegations(String delegatedEmployeeLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until) {
        DelegationQueryBuilder builder = new DelegationQueryBuilder(entityManager.getCriteriaBuilder());
        builder.withDelegatedEmployeeLogin(delegatedEmployeeLogin)
                .withDelegationStatus(status)
                .withSince(since)
                .withUntil(until);
        return entityManager.createQuery(builder.build()).getResultList();
    }
}
