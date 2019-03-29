package com.idemia.ip.office.backend.delegation.assistant.security.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Clock;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class TokenServiceImpl implements TokenService {

	private static final Logger logger = LoggerFactory.getLogger(TokenServiceImpl.class);

	private final Algorithm algorithm;
	private final long lifetime;

	public TokenServiceImpl(@Value("${jwt.lifetime}") int lifetime,
							@Value("${jwt.private-key-file-path:#{null}}") Optional<String> privateKeySystemFilePath,
							@Value("${jwt.private-key-file-name}") String privateKeyFileName) throws Exception {
        Path privateKeyFilePath =
				privateKeySystemFilePath
						.map(keySystemPath -> Paths.get(keySystemPath, privateKeyFileName))
						.orElseGet(() -> getPrivateKeyFilePath(privateKeyFileName));
		this.lifetime = lifetime;
		this.algorithm = Algorithm.HMAC512(Files.readAllBytes(privateKeyFilePath));
	}

	private Path getPrivateKeyFilePath(@Value("${jwt.private-key-file-name}") String privateKeyFileName) {
		try {
			return Path.of(getClass().getClassLoader().getResource(privateKeyFileName).toURI());
		} catch (URISyntaxException e) {
			logger.error("URI for the private key {} cannot be parsed.", privateKeyFileName);
			throw new IllegalArgumentException(e);
		}
	}

	@Override
	public String createToken(String subject, List<String> authorities) {
		final Clock utcClock = Clock.systemUTC();
		Date currentDate = Date.from(Instant.now(utcClock));
		Date expirationDate = Date.from(Instant.now(utcClock).plusSeconds(lifetime));
		return JWT.create()
				.withIssuer("idemia")
				.withSubject(subject)
				.withNotBefore(currentDate)
				.withIssuedAt(currentDate)
				.withExpiresAt(expirationDate)
				.withArrayClaim("authorities", authorities.toArray(new String[0]))
				.sign(algorithm);
	}

	@Override
	public Optional<DecodedJWT> verifyToken(String token) {
		Optional<DecodedJWT> decodedJWT;

		try {
			JWTVerifier verifier = JWT.require(algorithm).withIssuer("idemia").build();
			decodedJWT = Optional.of(verifier.verify(token));
		}
		catch (Exception e) {
			logger.info("Incorrect token " + token);
			decodedJWT = Optional.empty();
		}

		return  decodedJWT;
	}
}