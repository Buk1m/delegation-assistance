package com.idemia.ip.office.backend.delegation.assistant.external.clients.policies.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ConfigurationProperties(prefix = "retry.policy.exponential")
@Getter
@Setter
public class ExponentialRetryPolicyConfiguration {

    private Long initialBackoff;

    private Long maxBackoff;

    private Integer maxRetries;
}
