package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.stereotype.Component;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.APPROVED;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.NEEDS_WORK;
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.APPROVER;

@Component
public class ApproverDelegationFlowStrategy extends DelegationFlowStrategy {

    public ApproverDelegationFlowStrategy() {
        super(NEEDS_WORK, APPROVED);
    }

    @Override
    public Role getRoleForStatusValidation() {
        return APPROVER;
    }
}
