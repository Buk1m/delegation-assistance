package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED;
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.EMPLOYEE;

@Component
public class EmployeeDelegationFlowStrategy implements DelegationFlowStrategy {
    private final List<DelegationStatus> accessibleDelegationStatuses = Arrays.asList(
            PREPARED,
            CREATED);

    @Override
    public Role getRoleValidates() {
        return EMPLOYEE;
    }

    @Override
    public boolean validate(Delegation delegation) {
        return this.accessibleDelegationStatuses.contains(delegation.getDelegationStatus());
    }
}
