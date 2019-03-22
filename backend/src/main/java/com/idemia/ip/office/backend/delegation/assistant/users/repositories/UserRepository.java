package com.idemia.ip.office.backend.delegation.assistant.users.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsByLogin(String login);
	Optional<User> findByLogin(String login);
}
