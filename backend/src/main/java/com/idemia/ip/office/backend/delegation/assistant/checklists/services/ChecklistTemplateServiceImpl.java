package com.idemia.ip.office.backend.delegation.assistant.checklists.services;

import com.idemia.ip.office.backend.delegation.assistant.checklists.configuration.ChecklistsExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.ChecklistTemplateRepository;
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.ActivityTemplateRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate;
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.InvalidParameterException;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.UniqueValueExistsException;
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
    private final ActivityTemplateRepository activityTemplateRepository;

    public ChecklistTemplateServiceImpl(Scheduler scheduler,
            ChecklistsExceptionProperties checklistsExceptionProperties,
            ChecklistTemplateRepository checklistTemplateRepository,
            ActivityTemplateRepository activityTemplateRepository) {
        this.scheduler = scheduler;
        this.checklistsExceptionProperties = checklistsExceptionProperties;
        this.checklistTemplateRepository = checklistTemplateRepository;
        this.activityTemplateRepository = activityTemplateRepository;
    }

    @Transactional
    @Override
    public Mono<Void> addChecklistTemplate(ChecklistTemplate checklistTemplate) {
        if (checklistTemplateRepository.existsByCountryISO3(checklistTemplate.getCountryISO3())) {
            throw checklistForCountryAlreadyExistsException(checklistTemplate.getCountryISO3());
        }
        return Mono.fromRunnable(() -> checklistTemplateRepository.save(checklistTemplate)).publishOn(scheduler).then();
    }

    @Transactional(readOnly = true)
    @Override
    public Mono<ChecklistTemplate> getChecklistTemplate() {
        Mono<Optional<ChecklistTemplate>> globalChecklist = Mono.fromCallable(checklistTemplateRepository::findFirstBy)
                .publishOn(scheduler);
        return globalChecklist.map(checklistOptional -> checklistOptional.orElseThrow(this::checklistNotFoundException));
    }

    @Transactional
    @Override
    public Mono<Void> addTaskTemplateToChecklistTemplate(ActivityTemplate activityTemplate) {
        Mono<ChecklistTemplate> globalChecklist = getChecklistTemplate();
        return globalChecklist.flatMap(checklist -> {
            checklist.getActivities().add(activityTemplate);
            return Mono.fromRunnable(() -> checklistTemplateRepository.save(checklist));
        });
    }

    @Transactional
    @Override
    public Mono<Void> deleteTaskFromChecklistTemplate(Long taskId) {
        return Mono.fromRunnable(() -> activityTemplateRepository.deleteById(taskId));
    }

    private EntityNotFoundException checklistNotFoundException() {
        LOG.info("Checklist doesn't exist.");
        return new EntityNotFoundException("Checklist not found.",
                checklistsExceptionProperties.getChecklistNotFound(),
                ChecklistTemplate.class);
    }

    private UniqueValueExistsException checklistForCountryAlreadyExistsException(String countryISO3) {
        LOG.info("Checklist for country {} already exists.", countryISO3);
        return new UniqueValueExistsException("The checklist for this country is already defined.",
                checklistsExceptionProperties.getChecklistForCountryAlreadyExists(),
                countryISO3);
    }
}
