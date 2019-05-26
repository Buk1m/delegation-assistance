package com.idemia.ip.office.backend.delegation.assistant.external.clients.policies;

import com.idemia.ip.office.backend.delegation.assistant.external.clients.policies.configuration.ExponentialRetryPolicyConfiguration;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import reactor.retry.Retry;
import reactor.retry.RetryContext;

import java.time.Duration;
import java.util.function.Predicate;

@Component
@Qualifier("exponential")
public class ExponentialRetryPolicy implements RetryPolicy {

    private final ExponentialRetryPolicyConfiguration exponentialRetryPolicyConfiguration;

    public ExponentialRetryPolicy(ExponentialRetryPolicyConfiguration exponentialRetryPolicyConfiguration) {this.exponentialRetryPolicyConfiguration = exponentialRetryPolicyConfiguration;}

    @Override
    public <T> Retry<T> retry(Predicate<? super RetryContext<T>> retryPredicate) {
        Duration initialBackoff = Duration.ofMillis(exponentialRetryPolicyConfiguration.getInitialBackoff());
        Duration maxBackoff = Duration.ofMillis(exponentialRetryPolicyConfiguration.getMaxBackoff());
        return Retry.onlyIf(retryPredicate)
                .exponentialBackoff(initialBackoff, maxBackoff)
                .retryMax(exponentialRetryPolicyConfiguration.getMaxRetries());
    }
}
