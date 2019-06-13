package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.stereotype.Component;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.FINALIZED;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.NEEDS_WORK;
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.ACCOUNTANT;

@Component
public class AccountantDelegationFlowStrategy extends DelegationFlowStrategy {
    @Override
    public Role getRoleForStatusValidation() {
        return ACCOUNTANT;
    }

    public AccountantDelegationFlowStrategy() {
        super(NEEDS_WORK, FINALIZED);
    }
}
