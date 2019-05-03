package com.idemia.ip.office.backend.delegation.assistant.integrations

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate
import com.idemia.ip.office.backend.delegation.assistant.integrations.base.BaseIntegrationSpec
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.test.web.reactive.server.WebTestClient

class ChecklistsSpec extends BaseIntegrationSpec {

    def 'Should get global checklist'() {
        given: 'User'
            AuthToken employeeToken = businessLogicProvider.employeeToken()

        when: 'Tries to get global checklist'
            ChecklistTemplate checklistTemplate = businessLogicProvider.getGlobalChecklist(employeeToken)

        then: 'Got appropriate global checklist'
            checklistTemplate.activities.size() == 0
    }

    def 'Should add activity to checklist'() {
        given: 'Travel manager and new activity'
            AuthToken tmToken = businessLogicProvider.travelManagerToken()
            int initialActivityCount = getCurrentActivitiesCount(tmToken)

        when: 'Travel manger creates new activity'
            businessLogicProvider.createActivityTemplate(tmToken)

        then: 'Activity successfully created'
            initialActivityCount + 1 == getCurrentActivitiesCount(tmToken)
    }

    def 'Should not add any activity to checklist'(String tokenOwner) {
        given: 'Non privileged user'
            AuthToken token = businessLogicProvider."${tokenOwner}Token"()

        when: 'Non privileged user tries to create activity'
            WebTestClient.ResponseSpec response = businessLogicProvider.tryCreateActivityTemplate(token)

        then: 'Has not got access'
            response.expectStatus().isForbidden()

        where:
            tokenOwner << ['employee', 'approver', 'accountant']
    }

    def 'Should delete activity from checklist'() {
        given: 'Travel manager and activity'
            AuthToken tmToken = businessLogicProvider.travelManagerToken()
            ActivityTemplateDto activityTemplateDto = businessLogicProvider.createActivityTemplate(tmToken)
            int initialActivityCount = getCurrentActivitiesCount(tmToken)

        when: 'Travel manager deletes activity'
            businessLogicProvider.deleteActivity(tmToken, activityTemplateDto.id)

        then: 'Activity successfully deleted'
            initialActivityCount - 1 == getCurrentActivitiesCount(tmToken)
    }

    def 'Should not delete tasks from checklist'(String tokenOwner) {
        given: 'Non privileged user'
            AuthToken token = businessLogicProvider."${tokenOwner}Token"()

        when: 'Non privileged User tries to delete activity'
            WebTestClient.ResponseSpec response = businessLogicProvider.tryDeleteActivity(token)

        then: 'Has not got access'
            response.expectStatus().isForbidden()

        where:
            tokenOwner << ['employee', 'approver', 'accountant']
    }

    int getCurrentActivitiesCount(AuthToken authToken) {
        businessLogicProvider.getGlobalChecklist(authToken).activities.size()
    }

    long getAnyChecklistActivity(AuthToken authToken) {
        businessLogicProvider.getGlobalChecklist(authToken).activities.get(0).id
    }
}
