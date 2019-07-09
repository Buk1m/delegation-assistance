package com.idemia.ip.office.backend.delegation.assistant.integrations.providers;

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.test.web.reactive.server.WebTestClient

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto;
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyChecklistTemplateDto

@Component
class ChecklistLogicProvider extends BaseLogicProvider {

    ChecklistTemplateDto getChecklistTemplate(AuthToken authToken) {
        webTestClientWrapper.get('/checklist', authToken, HttpStatus.OK, ChecklistTemplateDto.class)
    }

    WebTestClient.ResponseSpec tryGetChecklistTemplate(AuthToken authToken) {
        webTestClientWrapper.get('/checklist', authToken)
    }

    ChecklistTemplateDto updateChecklistTemplate(AuthToken authToken, ChecklistTemplateDto updatedChecklistTemplateDto) {
        webTestClientWrapper.put('/checklist', authToken, updatedChecklistTemplateDto, HttpStatus.OK, ChecklistTemplateDto.class)
    }

    WebTestClient.ResponseSpec tryUpdateChecklistTemplate(AuthToken authToken, ChecklistTemplateDto updatedChecklistTemplateDto = anyChecklistTemplateDto()) {
        webTestClientWrapper.put('/checklist', authToken, updatedChecklistTemplateDto)
    }
}
