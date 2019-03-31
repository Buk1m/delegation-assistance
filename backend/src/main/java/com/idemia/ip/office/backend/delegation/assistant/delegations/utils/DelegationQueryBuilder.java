package com.idemia.ip.office.backend.delegation.assistant.delegations.utils;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class DelegationQueryBuilder {
    private CriteriaBuilder cb;
    private Optional<String> delegatedEmployeeLogin = Optional.empty();
    private Optional<DelegationStatus> delegationStatus = Optional.empty();
    private Optional<LocalDateTime> since = Optional.empty();
    private Optional<LocalDateTime> until = Optional.empty();

    public DelegationQueryBuilder(CriteriaBuilder cb) {
        this.cb = cb;
    }

    public DelegationQueryBuilder withDelegatedEmployeeLogin(String delegatedEmployeeLogin) {
        this.delegatedEmployeeLogin = Optional.of(delegatedEmployeeLogin);
        return this;
    }

    public DelegationQueryBuilder withDelegationStatus(DelegationStatus delegationStatus) {
        this.delegationStatus = Optional.of(delegationStatus);
        return this;
    }

    public DelegationQueryBuilder withSince(LocalDateTime since) {
        this.since = Optional.of(since);
        return this;
    }

    public DelegationQueryBuilder withUntil(LocalDateTime until) {
        this.until = Optional.of(until);
        return this;
    }

    public CriteriaQuery<Delegation> build() {
        CriteriaQuery<Delegation> query = cb.createQuery(Delegation.class);
        Root<Delegation> delegation = query.from(Delegation.class);

        List<Predicate> predicates = new ArrayList<>();
        this.delegatedEmployeeLogin.ifPresent(employee -> {
            Path<String> delegatedEmployeeLoginPath = delegation.get("delegatedEmployee.login");
            predicates.add(cb.like(delegatedEmployeeLoginPath, employee));
        });
        this.delegationStatus.ifPresent(status -> {
            Path<String> delegationStatusPath = delegation.get("delegationStatus");
            predicates.add(cb.like(delegationStatusPath, status.name()));
        });
        Path<String> startDatePath = delegation.get("startDate");
        this.since.ifPresent(since -> predicates.add(cb.greaterThanOrEqualTo(startDatePath, since.toString())));
        this.until.ifPresent(until -> predicates.add(cb.lessThanOrEqualTo(startDatePath, until.toString())));

        query.select(delegation);
        if (!predicates.isEmpty()) {
            query.where(cb.and(predicates.toArray(Predicate[]::new)));
        }

        return query;
    }
}
