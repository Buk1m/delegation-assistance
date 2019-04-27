package com.idemia.ip.office.backend.delegation.assistant.checklists.controllers;

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto;
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto;
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService;
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate;
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate;
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

    @PostMapping("/checklists")
    @PreAuthorize("hasRole('ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<ChecklistTemplateDto>> addChecklist(@RequestBody @Valid ChecklistTemplateDto checklistTemplateDto) {
        ChecklistTemplate checklistTemplate = modelMapper.map(checklistTemplateDto, ChecklistTemplate.class);
        return checklistTemplateService.addChecklistTemplate(checklistTemplate)
                .map(c -> modelMapper.map(c, ChecklistTemplateDto.class))
                .map(ResponseEntity::ok);
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
    public Mono<ResponseEntity<ActivityTemplateDto>> addTaskToChecklistTemplate(@RequestBody @Valid ActivityTemplateDto activityTemplateDto) {
        ActivityTemplate activityTemplate = modelMapper.map(activityTemplateDto, ActivityTemplate.class);
        return checklistTemplateService.addTaskTemplateToChecklistTemplate(activityTemplate)
                .map(a -> modelMapper.map(a, ActivityTemplateDto.class))
                .map(ResponseEntity::ok);
    }

    @DeleteMapping("/checklist/tasks/{id}")
    @PreAuthorize("hasRole('ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<Void>> deleteTaskFromChecklistTemplate(@PathVariable Long id) {
        return checklistTemplateService.deleteTaskFromChecklistTemplate(id).map(ResponseEntity::ok);
    }
}
