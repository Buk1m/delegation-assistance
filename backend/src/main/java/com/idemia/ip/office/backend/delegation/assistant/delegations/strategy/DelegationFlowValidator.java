package com.idemia.ip.office.backend.delegation.assistant.delegations.strategy;

import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.ApplicationException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.InvalidParameterException;
import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.idemia.ip.office.backend.delegation.assistant.utils.AuthoritiesToRolesMapper.mapAuthoritiesToRoles;

@Component
public class DelegationFlowValidator {
    private static final Logger LOG = LoggerFactory.getLogger(DelegationFlowValidator.class);

    private final Map<Role, DelegationFlowStrategy> delegationPatchStrategies;

    private final DelegationsExceptionProperties delegationsExceptionProperties;

    public DelegationFlowValidator(List<DelegationFlowStrategy> delegationPatchStrategies,
            DelegationsExceptionProperties delegationsExceptionProperties) {
        this.delegationPatchStrategies = delegationPatchStrategies.stream()
                .collect(Collectors.toMap(DelegationFlowStrategy::getRoleValidates, Function.identity()));
        this.delegationsExceptionProperties = delegationsExceptionProperties;
    }

    public Boolean validateDelegationFlow(Delegation newDelegation,
            Delegation existingDelegation,
            Collection<? extends GrantedAuthority> grantedAuthorities) {
        if (existingDelegation.getExpenses().size() <= 0) {
            throw getEmptyDelegationException(existingDelegation.getId());
        }
        return mapAuthoritiesToRoles(grantedAuthorities).stream()
                .map(delegationPatchStrategies::get)
                .filter(Objects::nonNull)
                .anyMatch(dps -> dps.validate(newDelegation));
    }

    public void validateDates(LocalDateTime since, LocalDateTime until) {
        if (since != null && until != null && since.isAfter(until)) {
            throw invalidDatesException();
        }
    }

    private ApplicationException getEmptyDelegationException(Long id) {
        LOG.info("User was trying to change delegation's status with id: {}", id);
        return new ApplicationException(delegationsExceptionProperties.getNoExpenses(), "Delegation has no expenses");
    }

    private InvalidParameterException invalidDatesException() {
        LOG.trace("Invalid date was provided");
        return new InvalidParameterException(
                delegationsExceptionProperties.getSinceDateMustBeEarlierThanUntilDate(),
                "Invalid since and until parameters! Since date must be earlier than until date!");
    }
}
