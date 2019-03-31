package com.idemia.ip.office.backend.delegation.assistant.delegations.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface DelegationRepositoryCustom {
    List<Delegation> getDelegations(String delegatedEmployeeLogin,
            DelegationStatus status,
            LocalDateTime since,
            LocalDateTime until);
}
