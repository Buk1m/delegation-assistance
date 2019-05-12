package com.idemia.ip.office.backend.delegation.assistant.checklists.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate;
import reactor.core.publisher.Mono;

public interface ChecklistTemplateService {

    Mono<ChecklistTemplate> getChecklistTemplate();
    Mono<ChecklistTemplate> updateChecklistTemplate(ChecklistTemplate checklistTemplate);
}
