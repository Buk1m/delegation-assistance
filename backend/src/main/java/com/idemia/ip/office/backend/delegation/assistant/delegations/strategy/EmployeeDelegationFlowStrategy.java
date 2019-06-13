package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.stereotype.Component;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED;
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.EMPLOYEE;

@Component
public class EmployeeDelegationFlowStrategy extends DelegationFlowStrategy {

    public EmployeeDelegationFlowStrategy() {
        super(CREATED, PREPARED);
    }

    @Override
    public Role getRoleForStatusValidation() {
        return EMPLOYEE;
    }
}
