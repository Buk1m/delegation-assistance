package com.idemia.ip.office.backend.delegation.assistant.integrations.base

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.configuration.PasswordProperties
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.test.web.reactive.server.WebTestClient

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.stream.Collectors

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.*
import static org.springframework.http.HttpStatus.OK

@Component
class BusinessLogicProvider {
    @Autowired
    private WebTestClientWrapper webTestClientWrapper
    @Autowired
    private PasswordProperties passwordProperties

    ActivityTemplateDto createActivityTemplate(AuthToken authToken, ActivityTemplateDto activityTemplateDto = anyActivityTemplateDto()) {
        webTestClientWrapper.post('/checklist/tasks', authToken, activityTemplateDto, OK, ActivityTemplateDto.class)
    }

    WebTestClient.ResponseSpec tryCreateActivityTemplate(AuthToken authToken) {
        webTestClientWrapper.post('/checklist/tasks', authToken, anyActivityTemplateDto())
    }

    DelegationDto createDelegation(AuthToken authToken, DelegationDto delegationDto = anyDelegationDTO()) {
        webTestClientWrapper.post('/delegations', authToken, delegationDto, OK, DelegationDto.class)
    }

    List<DelegationDto> createDelegations(AuthToken authToken, List<DelegationDto> delegationDtos) {
        delegationDtos.stream()
                .map { d -> createDelegation(authToken, d) }
                .collect(Collectors.toList())
    }

    void deleteActivity(AuthToken authToken, Long activityId, HttpStatus expectedStatus = OK) {
        webTestClientWrapper.delete("/checklist/tasks/${activityId}", authToken, expectedStatus)
    }

    WebTestClient.ResponseSpec tryDeleteActivity(AuthToken authToken) {
        webTestClientWrapper.delete('/checklist/tasks/1', authToken)
    }

    DelegationDto getDelegation(AuthToken authToken, Long delegationId) {
        webTestClientWrapper.get("/delegations/${delegationId}", authToken, OK, DelegationDto.class) as DelegationDto
    }

    List<DelegationDto> getUserDelegations(AuthToken authToken) {
        webTestClientWrapper.getCollection('/delegations/my', authToken, OK, DelegationDto.class, ArrayList.class) as List<DelegationDto>
    }

    List<DelegationDto> getAllDelegations(AuthToken authToken) {
        webTestClientWrapper.getCollection('/delegations', authToken, OK, DelegationDto.class, ArrayList.class)
    }

    WebTestClient.ResponseSpec tryGetAllDelegations(AuthToken authToken) {
        webTestClientWrapper.get('/delegations', authToken)
    }

    List<DelegationDto> getDelegationsFilteredBy(LocalDateTime since, LocalDateTime until, AuthToken authToken) {
        DateTimeFormatter formatter = getDateTimeFormatter()
        webTestClientWrapper.getCollection("/delegations?since=${since.format(formatter)}&until=${until.format(formatter)}",
                authToken,
                OK,
                DelegationDto.class,
                ArrayList.class) as List<DelegationDto>
    }

    List<DelegationDto> getUserDelegationsFilteredBy(LocalDateTime since, LocalDateTime until, AuthToken authToken) {
        DateTimeFormatter formatter = getDateTimeFormatter()
        webTestClientWrapper.getCollection("/delegations/my?since=${since.format(formatter)}&until=${until.format(formatter)}",
                authToken,
                OK,
                DelegationDto.class,
                ArrayList.class) as List<DelegationDto>
    }

    ChecklistTemplate getGlobalChecklist(AuthToken authToken) {
        webTestClientWrapper.get('/checklist', authToken, OK, ChecklistTemplate.class)
    }

    AuthToken accountantToken() {
        webTestClientWrapper.signIn(passwordProperties.accountantLogin, passwordProperties.accountantPassword)
    }

    AuthToken approverToken() {
        webTestClientWrapper.signIn(passwordProperties.approverLogin, passwordProperties.approverPassword)
    }

    AuthToken employeeToken() {
        webTestClientWrapper.signIn(passwordProperties.employeeLogin, passwordProperties.employeePassword)
    }

    AuthToken travelManagerToken() {
        webTestClientWrapper.signIn(passwordProperties.travelManagerLogin, passwordProperties.travelManagerPassword)
    }
}
