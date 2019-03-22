package com.idemia.ip.office.backend.delegation.assistant.security.services;

import java.util.List;

public interface AuthService {
	List<String> authenticate(String login, String password);
}
