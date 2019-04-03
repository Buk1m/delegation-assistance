package com.idemia.ip.office.backend.delegation.assistant.checklists

import com.idemia.ip.office.backend.delegation.assistant.checklists.configuration.ChecklistsExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.ChecklistRepository
import com.idemia.ip.office.backend.delegation.assistant.checklists.repositories.TaskRepository
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistService
import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist
import com.idemia.ip.office.backend.delegation.assistant.entities.Task
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import reactor.core.scheduler.Schedulers
import spock.lang.Specification

import java.util.concurrent.Executors

class ChecklistServiceCaseSpec extends Specification {

    ChecklistRepository checklistRepository = Mock(ChecklistRepository)
    ChecklistService checklistService = new ChecklistServiceImpl(
            Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor()),
            new ChecklistsExceptionProperties(),
            checklistRepository,
            Mock(TaskRepository))

    def 'getting checklist should return checklist'() {
        given: 'checklists'
            Checklist firstChecklist = new Checklist(1L, "cr1", new ArrayList<Task>())
            Checklist secondChecklist = new Checklist(2L, "cr2", new ArrayList<Task>())
            List<Checklist> checklists = new ArrayList<>()
            checklists.add(firstChecklist)
            checklists.add(secondChecklist)

        when: 'get checklist'
            Checklist returnedChecklist = checklistService.getChecklist().block()

        then: 'service should return the first checklist'
            checklistRepository.findAll() >> checklists

            returnedChecklist == firstChecklist
    }

    def 'getting non existent checklist should throw an exception'() {
        when: 'get checklist'
            checklistService.getChecklist().block()

        then: 'service should throw EntityNotFoundException'
            checklistRepository.findAll() >> new ArrayList<Checklist>()

            thrown EntityNotFoundException
    }

    def 'adding task to non existent checklist should throw an exception'() {
        given: 'new task'
            Task task = new Task('task', 'desc')

        when: 'add task'
            checklistService.addTaskToChecklist(task).block()

        then: 'service should throw EntityNotFoundException'
            checklistRepository.findAll() >> new ArrayList<Checklist>()

            thrown EntityNotFoundException
    }
}