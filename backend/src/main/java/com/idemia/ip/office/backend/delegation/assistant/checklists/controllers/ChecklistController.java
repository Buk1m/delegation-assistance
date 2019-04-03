package com.idemia.ip.office.backend.delegation.assistant.checklists.controllers;

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistDto;
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.TaskDto;
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistService;
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Task;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
public class ChecklistController {

    private final ModelMapper modelMapper;
    private final ChecklistService checklistService;

    public ChecklistController(ModelMapper modelMapper, ChecklistService checklistService) {
        this.modelMapper = modelMapper;
        this.checklistService = checklistService;
    }

    @GetMapping("/checklist")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYEE', 'ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<ChecklistDto>> getChecklist() {
        Mono<ChecklistDto> checklistDto = checklistService.getChecklist()
                .map(checklist -> modelMapper.map(checklist, ChecklistDto.class));
        return checklistDto.map(ResponseEntity::ok);
    }

    @PostMapping("/checklist/tasks")
    @PreAuthorize("hasRole('ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<Void>> addTaskToChecklist(@RequestBody @Valid TaskDto taskDto) {
        Task task = modelMapper.map(taskDto, Task.class);
        return checklistService.addTaskToChecklist(task).map(ResponseEntity::ok);
    }

    @DeleteMapping("/checklist/tasks/{id}")
    @PreAuthorize("hasRole('ROLE_TRAVEL_MANAGER')")
    public Mono<ResponseEntity<Void>> deleteTaskFromChecklist(@PathVariable Long id) {
        return checklistService.deleteTaskFromChecklist(id).map(ResponseEntity::ok);
    }
}
