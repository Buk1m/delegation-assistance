package com.idemia.ip.office.backend.delegation.assistant.checklists.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChecklistTemplateRepository extends JpaRepository<ChecklistTemplate, Long> {

    Optional<ChecklistTemplate> findFirstBy();
    boolean existsByCountryISO3(String countryISO3);
}
