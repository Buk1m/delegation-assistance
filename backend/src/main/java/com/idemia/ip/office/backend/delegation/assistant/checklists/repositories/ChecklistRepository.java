package com.idemia.ip.office.backend.delegation.assistant.checklists.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
}
