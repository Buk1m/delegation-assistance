package com.idemia.ip.office.backend.delegation.assistant.checklists.controllers;

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto;
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto;
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService;
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
public class ChecklistTemplateController {

    private final ModelMapper modelMapper;
    private final ChecklistTemplateService checklistTemplateService;

    public ChecklistTemplateController(ModelMapper modelMapper, ChecklistTemplateService checklistTemplateService) {
        this.modelMapper = modelMapper;
        this.checklistTemplateService = checklistTemplateService;
    }

    @GetMapping("/checklist")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYEE', 'ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<ChecklistTemplateDto>> getChecklistTemplate() {
        Mono<ChecklistTemplateDto> checklistDto = checklistTemplateService.getChecklistTemplate()
                .map(checklist -> modelMapper.map(checklist, ChecklistTemplateDto.class));
        return checklistDto.map(ResponseEntity::ok);
    }

    @PostMapping("/checklist/tasks")
    @PreAuthorize("hasRole('ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<Void>> addTaskToChecklistTemplate(@RequestBody @Valid ActivityTemplateDto activityTemplateDto) {
        ActivityTemplate activityTemplate = modelMapper.map(activityTemplateDto, ActivityTemplate.class);
        return checklistTemplateService.addTaskTemplateToChecklistTemplate(activityTemplate).map(ResponseEntity::ok);
    }

    @DeleteMapping("/checklist/tasks/{id}")
    @PreAuthorize("hasRole('ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<Void>> deleteTaskFromChecklistTemplate(@PathVariable Long id) {
        return checklistTemplateService.deleteTaskFromChecklistTemplate(id).map(ResponseEntity::ok);
    }
}
