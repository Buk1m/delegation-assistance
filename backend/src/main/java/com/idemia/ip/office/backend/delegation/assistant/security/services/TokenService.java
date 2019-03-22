package com.idemia.ip.office.backend.delegation.assistant.security.services;

import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.List;
import java.util.Optional;

public interface TokenService {
	String createToken(String subject, List<String> authorities);
	Optional<DecodedJWT> verifyToken(String token);
}
