package com.idemia.ip.office.backend.delegation.assistant.external.clients.policies;

import reactor.retry.Retry;
import reactor.retry.RetryContext;

import java.util.function.Predicate;

public interface RetryPolicy {
    <T> Retry<T> retry(Predicate<? super RetryContext<T>> retryPredicate);
}
