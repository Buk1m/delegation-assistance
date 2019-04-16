package com.idemia.ip.office.backend.delegation.assistant.checklists.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate;
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate;
import reactor.core.publisher.Mono;

public interface ChecklistTemplateService {
    Mono<ChecklistTemplate> getChecklistTemplate();

    Mono<Void> addTaskTemplateToChecklistTemplate(ActivityTemplate activityTemplate);

    Mono<Void> deleteTaskFromChecklistTemplate(Long taskId);
}
