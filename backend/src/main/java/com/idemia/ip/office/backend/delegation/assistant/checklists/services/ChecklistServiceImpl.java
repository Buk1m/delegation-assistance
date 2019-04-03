package com.idemia.ip.office.backend.delegation.assistant.checklists.services;

import com.idemia.ip.office.backend.delegation.assistant.checklists.configuration.ChecklistsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.ChecklistRepository;
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.TaskRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Task;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.util.Optional;

@Service
public class ChecklistServiceImpl implements ChecklistService {

    private static final Logger LOG = LoggerFactory.getLogger(ChecklistService.class);

    private final Scheduler scheduler;
    private final ChecklistsExceptionProperties checklistsExceptionProperties;
    private final ChecklistRepository checklistRepository;
    private final TaskRepository taskRepository;

    public ChecklistServiceImpl(Scheduler scheduler,
            ChecklistsExceptionProperties checklistsExceptionProperties,
            ChecklistRepository checklistRepository,
            TaskRepository taskRepository) {
        this.scheduler = scheduler;
        this.checklistsExceptionProperties = checklistsExceptionProperties;
        this.checklistRepository = checklistRepository;
        this.taskRepository = taskRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public Mono<Checklist> getChecklist() {
        Mono<Optional<Checklist>> globalChecklist = Mono.fromCallable(() -> checklistRepository.findAll()
                .stream()
                .findFirst())
                .publishOn(scheduler);
        return globalChecklist.map(checklistOptional -> checklistOptional.orElseThrow(this::checklistNotFoundException));
    }

    @Transactional
    @Override
    public Mono<Void> addTaskToChecklist(Task task) {
        Mono<Checklist> globalChecklist = getChecklist();
        return globalChecklist.flatMap(checklist -> {
            checklist.getTasks().add(task);
            return Mono.fromRunnable(() -> checklistRepository.save(checklist));
        });
    }

    @Transactional
    @Override
    public Mono<Void> deleteTaskFromChecklist(Long taskId) {
        return Mono.fromRunnable(() -> taskRepository.deleteById(taskId));
    }

    private EntityNotFoundException checklistNotFoundException() {
        LOG.info("Global checklist doesn't exists!");
        return new EntityNotFoundException("Checklist not found.",
                checklistsExceptionProperties.getChecklistNotFound(),
                Checklist.class);
    }
}
