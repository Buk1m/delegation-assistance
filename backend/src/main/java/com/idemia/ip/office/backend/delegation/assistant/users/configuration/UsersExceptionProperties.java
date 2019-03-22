package com.idemia.ip.office.backend.delegation.assistant.users.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ConfigurationProperties(prefix = "exception.users")
@Getter
@Setter
public class UsersExceptionProperties {
	String userNotFound;
	String userLoginAlreadyExists;
}
