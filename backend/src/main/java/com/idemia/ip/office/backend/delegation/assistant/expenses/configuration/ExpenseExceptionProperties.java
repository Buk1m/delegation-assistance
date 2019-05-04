package com.idemia.ip.office.backend.delegation.assistant.expenses.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ConfigurationProperties(prefix = "exception.expenses")
@Getter
@Setter
public class ExpenseExceptionProperties {
    String expenseNotFound;
}
