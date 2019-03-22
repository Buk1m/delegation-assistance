package com.idemia.ip.office.backend.delegation.assistant.security.services;

import com.idemia.ip.office.backend.delegation.assistant.security.configuration.Role;
import com.idemia.ip.office.backend.delegation.assistant.security.configuration.SecurityExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.security.exceptions.AuthenticationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthServiceMock implements AuthService {

	private static final Logger LOG = LoggerFactory.getLogger(AuthService.class);

	private final SecurityExceptionProperties securityExceptionProperties;

	public AuthServiceMock(SecurityExceptionProperties securityExceptionProperties) {
		this.securityExceptionProperties = securityExceptionProperties;
	}

	@Override
	public List<String> authenticate(String login, String password) {
		List<String> authorities = new ArrayList<>();

		if(login.equals("employee") && password.equals("pass1")) {
			authorities.add(Role.EMPLOYEE.toString());
		}
		else if(login.equals("manager") && password.equals("pass2")) {
			authorities.add(Role.TRAVEL_MANAGER.toString());
		}
		else if(login.equals("approver") && password.equals("pass3")) {
			authorities.add(Role.APPROVER.toString());
		}
		else if(login.equals("accountant") && password.equals("pass4")) {
			authorities.add(Role.ACCOUNTANT.toString());
		}
		else {
			LOG.info("Incorrect credentials for user {}.", login);
			throw new AuthenticationException("Incorrect credentials", securityExceptionProperties.getIncorrectCredentials(), login);
		}

		return authorities;
	}
}
