package com.idemia.ip.office.backend.delegation.assistant.checklists

import com.idemia.ip.office.backend.delegation.assistant.checklists.controllers.ChecklistTemplateController
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import org.modelmapper.ModelMapper
import org.springframework.http.ResponseEntity
import reactor.core.publisher.Mono
import spock.lang.Specification

class ChecklistTemplateControllerCaseSpec extends Specification {

    ModelMapper modelMapper = new ModelMapper()
    ChecklistTemplateService checklistService = Mock(ChecklistTemplateService)
    ChecklistTemplateController checklistController = new ChecklistTemplateController(modelMapper, checklistService)

    def 'getting checklist should return checklist'() {
        given: 'Checklist and ChecklistDto returned by service'
            ChecklistTemplate checklist = anyChecklist()
            ChecklistTemplateDto checklistDto = modelMapper.map(checklist, ChecklistTemplateDto.class)

        when: 'get checklist'
            ResponseEntity<ChecklistTemplateDto> responseEntity = checklistController.getChecklistTemplate().block()

        then: 'controller should return 200 with ChecklistDto in response body'
            checklistService.getChecklistTemplate() >> Mono.just(checklist)

            responseEntity.statusCodeValue == 200
            responseEntity.body == checklistDto
            responseEntity.body.activities.size() == 2
    }

    def 'getting non existent checklist should throw an exception'() {
        when: 'get checklist'
            checklistController.getChecklistTemplate().block()

        then: 'service throw exception'
            checklistService.getChecklistTemplate() >> {
                throw new EntityNotFoundException("Checklist not found", "checklist-not-found", ChecklistTemplate.class)
            }

            thrown EntityNotFoundException
    }

    ChecklistTemplate anyChecklist() {
        ChecklistTemplate checklist = new ChecklistTemplate()
        checklist.setId(1L)
        ActivityTemplate task1 = new ActivityTemplate('task1', 'desc1')
        ActivityTemplate task2 = new ActivityTemplate('task2', 'desc2')
        checklist.getActivities().add(task1)
        checklist.getActivities().add(task2)
        return checklist
    }
}