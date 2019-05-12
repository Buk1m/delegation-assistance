package com.idemia.ip.office.backend.delegation.assistant.checklists.controllers;

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto;
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService;
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

    @GetMapping("/checklist")
    @PreAuthorize("hasRole('ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<ChecklistTemplateDto>> getChecklistTemplate() {
        return checklistTemplateService.getChecklistTemplate()
                .map(checklistTemplate -> modelMapper.map(checklistTemplate, ChecklistTemplateDto.class))
                .map(ResponseEntity::ok);
    }

    @PutMapping("/checklist")
    @PreAuthorize("hasRole('ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<ChecklistTemplateDto>> updateChecklistTemplate(
            @RequestBody @Valid ChecklistTemplateDto checklistTemplateDto) {
        ChecklistTemplate checklistTemplate = modelMapper.map(checklistTemplateDto, ChecklistTemplate.class);
        return checklistTemplateService.updateChecklistTemplate(checklistTemplate)
                .map(updatedChecklistTemplate -> modelMapper.map(updatedChecklistTemplate, ChecklistTemplateDto.class))
                .map(ResponseEntity::ok);
    }
}
