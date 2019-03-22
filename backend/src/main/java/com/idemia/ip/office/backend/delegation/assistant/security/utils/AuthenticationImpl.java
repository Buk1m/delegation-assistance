package com.idemia.ip.office.backend.delegation.assistant.security.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class AuthenticationImpl implements Authentication {

	private String token;
	private String issuer;
	private String subject;
	private List<GrantedAuthority> authorities;
	private boolean authenticated;

	public AuthenticationImpl(String token) {
		this.token = token;
		this.authenticated = false;
	}

	public AuthenticationImpl(String token, String issuer, String subject, List<GrantedAuthority> authorities) {
		this.token = token;
		this.issuer = issuer;
		this.subject = subject;
		this.authorities = authorities;
		this.authenticated = true;
	}

	@Override
	public boolean isAuthenticated() {
		return authenticated;
	}

	@Override
	public void setAuthenticated(boolean authenticated) throws IllegalArgumentException {
		if(authenticated) {
			throw new IllegalArgumentException();
		}

		this.authenticated = false;
	}

	@Override
	public Object getPrincipal() {
		return subject;
	}

	@Override
	public String getName() {
		return subject;
	}

	@Override
	public Object getCredentials() {
		return token;
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public Object getDetails() {
		return issuer;
	}
}

