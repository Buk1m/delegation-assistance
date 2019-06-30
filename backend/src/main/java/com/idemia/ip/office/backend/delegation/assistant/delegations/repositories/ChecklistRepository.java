package com.idemia.ip.office.backend.delegation.assistant.delegations.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
}
