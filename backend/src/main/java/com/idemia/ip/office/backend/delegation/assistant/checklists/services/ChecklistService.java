package com.idemia.ip.office.backend.delegation.assistant.checklists.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Task;
import reactor.core.publisher.Mono;

public interface ChecklistService {
    Mono<Checklist> getChecklist();

    Mono<Void> addTaskToChecklist(Task task);

    Mono<Void> deleteTaskFromChecklist(Long taskId);
}
