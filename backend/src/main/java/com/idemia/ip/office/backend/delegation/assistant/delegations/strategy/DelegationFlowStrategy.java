package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.PriorityBlockingQueue;

public abstract class DelegationFlowStrategy {

    private List<DelegationStatus> accessibleDelegationStatuses;

    public DelegationFlowStrategy(DelegationStatus... assignableStatuses) {
        accessibleDelegationStatuses = Arrays.asList(assignableStatuses);
    }

    public DelegationFlowStrategy(List<DelegationStatus> accessibleDelegationStatuses) {
        this.accessibleDelegationStatuses = accessibleDelegationStatuses;
    }

    public abstract Role getRoleForStatusValidation();

    public boolean validate(Delegation newDelegation) {
        return this.accessibleDelegationStatuses.contains(newDelegation.getDelegationStatus());
    }
}
