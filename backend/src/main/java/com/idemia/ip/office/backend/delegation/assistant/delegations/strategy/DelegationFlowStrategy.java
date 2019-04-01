package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;

public interface DelegationFlowStrategy {
    Role getRoleValidates();

    boolean validate(Delegation delegation);
}
