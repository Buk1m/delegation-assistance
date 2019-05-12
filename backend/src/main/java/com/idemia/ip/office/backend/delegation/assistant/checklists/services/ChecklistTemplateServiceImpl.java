package com.idemia.ip.office.backend.delegation.assistant.checklists.services;

import com.idemia.ip.office.backend.delegation.assistant.checklists.configuration.ChecklistsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.ChecklistTemplateRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.util.Optional;

@Service
public class ChecklistTemplateServiceImpl implements ChecklistTemplateService {

    private static final Logger LOG = LoggerFactory.getLogger(ChecklistTemplateService.class);

    private final Scheduler scheduler;
    private final ChecklistsExceptionProperties checklistsExceptionProperties;
    private final ChecklistTemplateRepository checklistTemplateRepository;

    public ChecklistTemplateServiceImpl(Scheduler scheduler,
            ChecklistsExceptionProperties checklistsExceptionProperties,
            ChecklistTemplateRepository checklistTemplateRepository) {
        this.scheduler = scheduler;
        this.checklistsExceptionProperties = checklistsExceptionProperties;
        this.checklistTemplateRepository = checklistTemplateRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public Mono<ChecklistTemplate> getChecklistTemplate() {
        Mono<Optional<ChecklistTemplate>> checklistTemplateOptional = Mono.fromCallable(checklistTemplateRepository::findFirstBy)
                .publishOn(scheduler);
        return checklistTemplateOptional.map(checklistOptional -> checklistOptional.orElseThrow(this::checklistNotFoundException));
    }

    @Transactional
    @Override
    public Mono<ChecklistTemplate> updateChecklistTemplate(ChecklistTemplate updatedChecklistTemplate) {
        return getChecklistTemplate().flatMap(checklistTemplate -> {
            checklistTemplate.setActivities(updatedChecklistTemplate.getActivities());
            return Mono.fromCallable(() -> checklistTemplateRepository.save(checklistTemplate)).publishOn(scheduler);
        });
    }

    private EntityNotFoundException checklistNotFoundException() {
        LOG.error("Checklist template doesn't exist.");
        return new EntityNotFoundException("Checklist template not found.",
                checklistsExceptionProperties.getChecklistNotFound(),
                ChecklistTemplate.class);
    }
}
