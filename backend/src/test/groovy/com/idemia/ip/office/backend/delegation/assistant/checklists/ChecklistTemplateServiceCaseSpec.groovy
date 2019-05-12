package com.idemia.ip.office.backend.delegation.assistant.checklists

import com.idemia.ip.office.backend.delegation.assistant.checklists.configuration.ChecklistsExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.ChecklistTemplateRepository
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider
import reactor.core.scheduler.Schedulers
import spock.lang.Specification

import java.util.concurrent.Executors

class ChecklistTemplateServiceCaseSpec extends Specification {

    ChecklistTemplateRepository checklistRepository = Mock(ChecklistTemplateRepository)
    ChecklistTemplateService checklistService = new ChecklistTemplateServiceImpl(
            Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor()),
            new ChecklistsExceptionProperties(),
            checklistRepository)

    def 'should get checklist template'() {
        given: 'checklist template'
            ChecklistTemplate checklistTemplate = TestDataProvider.anyChecklistTemplate()

        when: 'get checklist template'
            ChecklistTemplate returnedChecklist = checklistService.getChecklistTemplate().block()

        then: 'service should return checklist template'
            1 * checklistRepository.findFirstBy() >> Optional.ofNullable(checklistTemplate)

            returnedChecklist == checklistTemplate
    }

    def 'should throw EntityNotFound with ChecklistTemplate.class'() {
        when: 'get checklist template'
            checklistService.getChecklistTemplate().block()

        then: 'service should return checklist template'
            1 * checklistRepository.findFirstBy() >> Optional.ofNullable(null)

            def e = thrown(EntityNotFoundException)
            e.getEntityClass() == ChecklistTemplate.class
    }

    def 'should update checklist template'() {
        given: 'checklist template'
            ChecklistTemplate checklistTemplate = TestDataProvider.anyChecklistTemplate()

        when: 'update checklist template'
            ChecklistTemplate updatedChecklistTemplate = checklistService.updateChecklistTemplate(checklistTemplate).block()

        then: 'service should return updated checklist template'
            1 * checklistRepository.findFirstBy() >> Optional.ofNullable(checklistTemplate)
            1 * checklistRepository.save(checklistTemplate) >> checklistTemplate

            updatedChecklistTemplate == checklistTemplate
    }
}
