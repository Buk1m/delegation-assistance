package com.idemia.ip.office.backend.delegation.assistant.delegations.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Meals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealsRepository extends JpaRepository<Meals, Long> {
}
