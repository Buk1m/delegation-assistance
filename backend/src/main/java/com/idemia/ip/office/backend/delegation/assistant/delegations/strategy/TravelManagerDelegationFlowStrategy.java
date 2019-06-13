package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.springframework.stereotype.Component;

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.APPROVED;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CHECKED;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.NEEDS_WORK;
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED;
import static com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role.TRAVEL_MANAGER;

@Component
public class TravelManagerDelegationFlowStrategy extends DelegationFlowStrategy {

    public TravelManagerDelegationFlowStrategy() {
        super(NEEDS_WORK, CHECKED, APPROVED, PREPARED);
    }

    @Override
    public Role getRoleForStatusValidation() {
        return TRAVEL_MANAGER;
    }
}
