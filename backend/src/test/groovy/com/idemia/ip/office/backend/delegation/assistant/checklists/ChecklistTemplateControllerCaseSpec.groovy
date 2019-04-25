package com.idemia.ip.office.backend.delegation.assistant.checklists

import com.idemia.ip.office.backend.delegation.assistant.checklists.controllers.ChecklistTemplateController
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import com.idemia.ip.office.backend.delegation.assistant.exceptions.UniqueValueExistsException
import org.modelmapper.ModelMapper
import org.springframework.http.ResponseEntity
import reactor.core.publisher.Mono
import spock.lang.Specification

class ChecklistTemplateControllerCaseSpec extends Specification {

    ModelMapper modelMapper = new ModelMapper()
    ChecklistTemplateService checklistService = Mock(ChecklistTemplateService)
    ChecklistTemplateController checklistController = new ChecklistTemplateController(modelMapper, checklistService)

    def 'adding checklist should add checklist'() {
        given: 'checklist'
            ChecklistTemplate checklistTemplate = anyChecklist()
            ChecklistTemplateDto checklistTemplateDto = modelMapper.map(checklistTemplate, ChecklistTemplateDto.class)

        when: 'add a new checklist'
            checklistController.addChecklist(checklistTemplateDto).block()

        then: 'service should throw exception'
            1 * checklistService.addChecklistTemplate(_ as ChecklistTemplate) >> Mono.empty().then()
    }

    def 'adding checklist for country which already has defined checklist should throw exception'() {
        given: 'checklist'
            ChecklistTemplate checklistTemplate = anyChecklist()
            ChecklistTemplateDto checklistTemplateDto = modelMapper.map(checklistTemplate, ChecklistTemplateDto.class)

        when: 'add a new checklist'
            checklistController.addChecklist(checklistTemplateDto).block()

        then: 'service should throw exception'
            1 * checklistService.addChecklistTemplate(_ as ChecklistTemplate) >> Mono.error(
                    new UniqueValueExistsException("error-code", "countryISO3"))

            thrown UniqueValueExistsException
    }

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
        List<ActivityTemplate> activities = new ArrayList<>()
        activities.add(new ActivityTemplate('task1', 'desc1'))
        activities.add(new ActivityTemplate('task2', 'desc2'))
        return new ChecklistTemplate(1L, 'POL', activities)
    }
}