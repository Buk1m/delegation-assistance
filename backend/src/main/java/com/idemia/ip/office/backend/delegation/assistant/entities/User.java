package com.idemia.ip.office.backend.delegation.assistant.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false)
	@Getter
	private Long id;

	@Column(name = "login", unique = true, nullable = false)
	@Getter
	@Setter
	private String login;

	public User() {
	}

	public User(String login) {
		this.login = login;
	}

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}

		if (!(object instanceof User)) {
			return false;
		}

		User user = (User) object;
		return Objects.equals(getLogin(), user.getLogin());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getLogin());
	}
}
