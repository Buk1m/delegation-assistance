package com.idemia.ip.office.backend.delegation.assistant.checklists

import com.idemia.ip.office.backend.delegation.assistant.checklists.controllers.ChecklistTemplateController
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate

import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider
import org.modelmapper.ModelMapper
import org.springframework.http.ResponseEntity
import reactor.core.publisher.Mono
import spock.lang.Specification

class ChecklistTemplateControllerCaseSpec extends Specification {

    ModelMapper modelMapper = new ModelMapper()
    ChecklistTemplateService checklistTemplateService = Mock(ChecklistTemplateService)
    ChecklistTemplateController checklistTemplateController = new ChecklistTemplateController(modelMapper, checklistTemplateService)

    def 'should return checklist template'() {
        given: 'ChecklistTemplate returned by service'
            ChecklistTemplate checklistTemplate = TestDataProvider.anyChecklistTemplate()

        when: 'get checklist template'
            ResponseEntity<ChecklistTemplateDto> responseEntity = checklistTemplateController.getChecklistTemplate().block()

        then: 'controller should return 200 with ChecklistTemplateDto in response body'
            1 * checklistTemplateService.getChecklistTemplate() >> Mono.just(checklistTemplate)

            responseEntity.statusCodeValue == 200
            responseEntity.body == modelMapper.map(checklistTemplate, ChecklistTemplateDto.class)
    }

    def 'should update checklist template'() {
        given: 'ChecklistTemplateDto'
            ChecklistTemplateDto checklistTemplateDto = TestDataProvider.anyChecklistTemplateDto()

        when: 'update checklist template'
            ResponseEntity<ChecklistTemplateDto> responseEntity = checklistTemplateController.updateChecklistTemplate(checklistTemplateDto).block()

        then: 'service should return updated checklist template'
            1 * checklistTemplateService.updateChecklistTemplate(_ as ChecklistTemplate) >> {
                Mono.just(modelMapper.map(checklistTemplateDto, ChecklistTemplate.class))
            }

            responseEntity.statusCodeValue == 200
            responseEntity.body == checklistTemplateDto
    }

    def 'should throw EntityNotFound with ChecklistTemplate.class'() {
        when: 'get checklist template'
            checklistTemplateController.getChecklistTemplate().block()

        then: 'service throw exception'
            1 * checklistTemplateService.getChecklistTemplate() >> {
                throw new EntityNotFoundException("Checklist template not found", "checklist-not-found", ChecklistTemplate.class)
            }

            thrown EntityNotFoundException
    }
}
