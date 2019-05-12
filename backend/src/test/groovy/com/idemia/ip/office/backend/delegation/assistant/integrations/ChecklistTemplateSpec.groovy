package com.idemia.ip.office.backend.delegation.assistant.integrations

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.integrations.base.BaseIntegrationSpec
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider
import org.springframework.http.HttpStatus
import org.springframework.test.web.reactive.server.WebTestClient
import spock.lang.Unroll

class ChecklistTemplateSpec extends BaseIntegrationSpec {

    def 'should get checklist template'() {
        given: 'travelManager'
            AuthToken travelManagerToken = businessLogicProvider.travelManagerToken()

        when: 'Travel manager is trying to get checklist template'
            ChecklistTemplateDto checklistTemplateDto = businessLogicProvider.getChecklistTemplate(travelManagerToken)

        then: 'Travel manager has got appropriate checklist template'
            checklistTemplateDto.activities.size() == 0
    }

    @Unroll
    def 'should not get checklist template by non privileged user: #tokenOwner'() {
        given: 'Non privileged token owner'
            AuthToken token = businessLogicProvider."${tokenOwner}Token"()

        when: 'Non privileged user is trying to create activity'
            WebTestClient.ResponseSpec response = businessLogicProvider.tryGetChecklistTemplate(token)

        then: 'Non privileged user has not got access'
            response.expectStatus().isForbidden()

        where:
            tokenOwner << ['employee', 'approver', 'accountant']
    }

    def 'should update empty checklist template'() {
        given: 'travelManager and checklistTemplateDto'
            AuthToken travelManagerToken = businessLogicProvider.travelManagerToken()
            ChecklistTemplateDto checklistTemplateDto = TestDataProvider.anyChecklistTemplateDto()
            addNewActivitiesToChecklistTemplateDto(checklistTemplateDto)

        when: 'Travel manager is trying to update checklist template'
            ChecklistTemplateDto updatedChecklistTemplateDto = businessLogicProvider.updateChecklistTemplate(travelManagerToken, checklistTemplateDto)

        then: 'Travel manager has got appropriate updated checklist template'
            updatedChecklistTemplateDto.activities.size() == 6
            updatedChecklistTemplateDto.activities[4].getId() == 5
            updatedChecklistTemplateDto.activities[5].getId() == 6
    }

    @Unroll
    def 'should not update checklist template by non privileged user: #tokenOwner'() {
        given: 'Non privileged token'
            AuthToken token = businessLogicProvider."${tokenOwner}Token"()

        when: 'Non privileged user is trying to create activity'
            WebTestClient.ResponseSpec response = businessLogicProvider.tryUpdateChecklistTemplate(token)

        then: 'Non privileged user has not got access'
            response.expectStatus().isForbidden()

        where:
            tokenOwner << ['employee', 'approver', 'accountant']
    }

    def 'should update checklist template'() {
        given: 'travelManager, existingChecklistTemplateDto and checklistTemplateDto'
            AuthToken travelManagerToken = businessLogicProvider.travelManagerToken()
            ChecklistTemplateDto existingChecklistTemplateDto = TestDataProvider.anyChecklistTemplateDto()
            addNewActivitiesToChecklistTemplateDto(existingChecklistTemplateDto)
            ChecklistTemplateDto checklistTemplateDto = TestDataProvider.anyChecklistTemplateDto()
            addNewActivitiesToChecklistTemplateDto(checklistTemplateDto)
            removeActivitiesFromChecklistTemplateDto(checklistTemplateDto)

        when: 'Travel manager is trying to update checklist template'
            businessLogicProvider.updateChecklistTemplate(travelManagerToken, existingChecklistTemplateDto)
            ChecklistTemplateDto updatedChecklistTemplateDto = businessLogicProvider.updateChecklistTemplate(travelManagerToken, checklistTemplateDto)

        then: 'Travel manager has got appropriate updated checklist template'
            updatedChecklistTemplateDto.activities.size() == 3
            checklistTemplateDto.activities.eachWithIndex { ActivityTemplateDto activity, int i ->
                def id = [2, 3, 4]
                activity.id == id[i]
                activity.task == "task" + id[i]
                activity.description == "desc" + id[i]
            }
    }

    def 'should not update checklist template (conflict)'() {
        given: 'travelManager, existingChecklistTemplateDto and checklistTemplateDto'
            AuthToken travelManagerToken = businessLogicProvider.travelManagerToken()
            ChecklistTemplateDto existingChecklistTemplateDto = TestDataProvider.anyChecklistTemplateDto()
            existingChecklistTemplateDto.activities.remove(2)
            existingChecklistTemplateDto.activities.remove(2)
            ChecklistTemplateDto checklistTemplateDto = TestDataProvider.anyChecklistTemplateDto()
            checklistTemplateDto.activities.remove(0)

        when: 'Travel manager is trying to update checklist template'
            businessLogicProvider.updateChecklistTemplate(travelManagerToken, existingChecklistTemplateDto)
            WebTestClient.ResponseSpec response = businessLogicProvider.tryUpdateChecklistTemplate(travelManagerToken)

        then: 'Conflict'
            response.expectStatus().isEqualTo(HttpStatus.CONFLICT)
    }

    def 'should get checklist template with activities ordered by priority'() {
        given: 'travelManager, and existingChecklistTemplateDto'
            AuthToken travelManagerToken = businessLogicProvider.travelManagerToken()
            ChecklistTemplateDto existingChecklistTemplateDto = TestDataProvider.anyChecklistTemplateDto()

        when: 'Travel manager is trying to get checklist template'
            businessLogicProvider.updateChecklistTemplate(travelManagerToken, existingChecklistTemplateDto)
            ChecklistTemplateDto checklistTemplateDto = businessLogicProvider.getChecklistTemplate(travelManagerToken)

        then: 'Travel manager has got appropriate checklist template'
            checklistTemplateDto.activities.size() == 4
            checklistTemplateDto.activities.eachWithIndex { ActivityTemplateDto activity, int i ->
                activity.id == i as Long
                activity.task == "task" + i
                activity.description == "desc" + i
            }
    }

    void removeActivitiesFromChecklistTemplateDto(ChecklistTemplateDto checklistTemplateDto) {
        checklistTemplateDto.activities.remove(0)
        checklistTemplateDto.activities.remove(3)
        checklistTemplateDto.activities.remove(3)
        checklistTemplateDto.getActivities()[0].setVersion(0L)
        checklistTemplateDto.getActivities()[1].setVersion(0L)
        checklistTemplateDto.getActivities()[2].setVersion(0L)
    }

    void addNewActivitiesToChecklistTemplateDto(ChecklistTemplateDto checklistTemplateDto) {
        checklistTemplateDto.activities.add(new ActivityTemplateDto(null, 'task5', 'desc5', 4))
        checklistTemplateDto.activities.add(new ActivityTemplateDto(null, 'task6', 'desc6', 5))
    }
}
