package com.idemia.ip.office.backend.delegation.assistant.checklists

import com.idemia.ip.office.backend.delegation.assistant.checklists.controllers.ChecklistController
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.TaskDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistService
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist
import com.idemia.ip.office.backend.delegation.assistant.entities.Task
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import org.modelmapper.ModelMapper
import org.springframework.http.ResponseEntity
import reactor.core.publisher.Mono
import spock.lang.Specification

class ChecklistControllerCaseSpec extends Specification {

    ModelMapper modelMapper = new ModelMapper()
    ChecklistService checklistService = Mock(ChecklistService)
    ChecklistController checklistController = new ChecklistController(modelMapper, checklistService)

    def 'getting checklist should return checklist'() {
        given: 'Checklist and ChecklistDto returned by service'
            Checklist checklist = anyChecklist()
            ChecklistDto checklistDto = modelMapper.map(checklist, ChecklistDto.class)

        when: 'get checklist'
            ResponseEntity<ChecklistDto> responseEntity = checklistController.getChecklist().block()

        then: 'controller should return 200 with ChecklistDto in response body'
            checklistService.getChecklist() >> Mono.just(checklist)

            responseEntity.statusCodeValue == 200
            responseEntity.body == checklistDto
            responseEntity.body.tasks.size() == 2
    }

    def 'getting non existent checklist should throw an exception'() {
        when: 'get checklist'
            checklistController.getChecklist().block()

        then: 'service throw exception'
            checklistService.getChecklist() >> {
                throw new EntityNotFoundException("Checklist not found", "checklist-not-found", Checklist.class)
            }

            thrown EntityNotFoundException
    }

    def 'adding task to non existent checklist should return void'() {
        given: 'Task and TaskDto'
            TaskDto taskDto = new TaskDto()
            Task task = new Task()

        when: 'add new task'
            checklistController.addTaskToChecklist(taskDto).block()

        then: 'controller should return void'
            checklistService.addTaskToChecklist(task) >> Mono.empty().then()
    }

    Checklist anyChecklist() {
        Checklist checklist = new Checklist()
        checklist.setId(1L)
        Task task1 = new Task('task1', 'desc1')
        Task task2 = new Task('task2', 'desc2')
        checklist.getTasks().add(task1)
        checklist.getTasks().add(task2)
        return checklist
    }
}