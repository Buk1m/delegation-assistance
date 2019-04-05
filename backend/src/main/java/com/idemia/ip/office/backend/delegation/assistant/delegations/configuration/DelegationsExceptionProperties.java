package com.idemia.ip.office.backend.delegation.assistant.delegations.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ConfigurationProperties(prefix = "exception.delegations")
@Getter
@Setter
public class DelegationsExceptionProperties {
    String sinceDateMustBeEarlierThanUntilDate;
    String delegationNotFound;
    String noExpenses;
}
