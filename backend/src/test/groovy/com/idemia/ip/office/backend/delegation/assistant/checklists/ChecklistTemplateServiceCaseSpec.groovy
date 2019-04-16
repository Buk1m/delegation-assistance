package com.idemia.ip.office.backend.delegation.assistant.checklists

import com.idemia.ip.office.backend.delegation.assistant.checklists.configuration.ChecklistsExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.ChecklistTemplateRepository
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.ActivityTemplateRepository
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import reactor.core.scheduler.Schedulers
import spock.lang.Specification

import java.util.concurrent.Executors

class ChecklistTemplateServiceCaseSpec extends Specification {

    ChecklistTemplateRepository checklistRepository = Mock(ChecklistTemplateRepository)
    ChecklistTemplateService checklistService = new ChecklistTemplateServiceImpl(
            Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor()),
            new ChecklistsExceptionProperties(),
            checklistRepository,
            Mock(ActivityTemplateRepository))

    def 'getting checklist should return checklist'() {
        given: 'checklists'
            ChecklistTemplate checklistTemplate = new ChecklistTemplate(1L, "cr1", new ArrayList<ActivityTemplate>())

        when: 'get checklist'
            ChecklistTemplate returnedChecklist = checklistService.getChecklistTemplate().block()

        then: 'service should return the first checklist'
            checklistRepository.findFirstBy() >> Optional.ofNullable(checklistTemplate)

            returnedChecklist == checklistTemplate
    }

    def 'getting non existent checklist should throw an exception'() {
        when: 'get checklist'
            checklistService.getChecklistTemplate().block()

        then: 'service should throw EntityNotFoundException'
            checklistRepository.findFirstBy() >> Optional.empty()

            thrown EntityNotFoundException
    }

    def 'adding task to non existent checklist should throw an exception'() {
        given: 'new task'
            ActivityTemplate task = new ActivityTemplate('task', 'desc')

        when: 'add task'
            checklistService.addTaskTemplateToChecklistTemplate(task).block()

        then: 'service should throw EntityNotFoundException'
            checklistRepository.findFirstBy() >> Optional.empty()

            thrown EntityNotFoundException
    }
}