package com.idemia.ip.office.backend.delegation.assistant.checklists.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityTemplateRepository extends JpaRepository<ActivityTemplate, Long> {
}
