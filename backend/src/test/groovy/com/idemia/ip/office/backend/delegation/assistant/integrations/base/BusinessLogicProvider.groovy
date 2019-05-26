package com.idemia.ip.office.backend.delegation.assistant.integrations.base

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.configuration.PasswordProperties
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.*
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.test.web.reactive.server.WebTestClient

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.stream.Collectors

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_TIME_FORMAT
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.*
import static org.springframework.http.HttpStatus.OK

@Component
class BusinessLogicProvider {

    @Autowired
    private WebTestClientWrapper webTestClientWrapper

    @Autowired
    private PasswordProperties passwordProperties

    ChecklistTemplateDto getChecklistTemplate(AuthToken authToken) {
        webTestClientWrapper.get('/checklist', authToken, OK, ChecklistTemplateDto.class)
    }

    WebTestClient.ResponseSpec tryGetChecklistTemplate(AuthToken authToken) {
        webTestClientWrapper.get('/checklist', authToken)
    }

    ChecklistTemplateDto updateChecklistTemplate(AuthToken authToken, ChecklistTemplateDto updatedChecklistTemplateDto) {
        webTestClientWrapper.put('/checklist', authToken, updatedChecklistTemplateDto, OK, ChecklistTemplateDto.class)
    }

    WebTestClient.ResponseSpec tryUpdateChecklistTemplate(AuthToken authToken, ChecklistTemplateDto updatedChecklistTemplateDto = anyChecklistTemplateDto()) {
        webTestClientWrapper.put('/checklist', authToken, updatedChecklistTemplateDto)
    }

    MealsDto updateDelegationMeals(AuthToken authToken, MealsDto mealsDto = anyMealsDto(), Long delegationId) {
        webTestClientWrapper.patch("/delegations/${delegationId}/meals", authToken, mealsDto, OK, MealsDto.class)
    }

    DelegationDetailsDto createDelegation(AuthToken authToken, DelegationDetailsDto delegationDto = anyDelegationDetailsDto()) {
        webTestClientWrapper.post('/delegations', authToken, delegationDto, OK, DelegationDetailsDto.class)
    }

    FlightDto createDelegationFlight(AuthToken authToken, FlightDto flightDto, Long delegationId) {
        webTestClientWrapper.post("/delegations/${delegationId}/flights", authToken, flightDto, OK, FlightDto.class)
    }

    AccommodationDto createDelegationAccommodation(AuthToken authToken, AccommodationDto accommodationDto, Long delegationId) {
        webTestClientWrapper.post("/delegations/${delegationId}/accommodations", authToken, accommodationDto, OK, AccommodationDto.class)
    }

    List<DelegationDetailsDto> createDelegations(AuthToken authToken, List<DelegationDetailsDto> delegationDtos) {
        delegationDtos.stream()
                .map { d -> createDelegation(authToken, d) }
                .collect(Collectors.toList())
    }

    DelegationDetailsDto getDelegation(AuthToken authToken, Long delegationId) {
        webTestClientWrapper.get("/delegations/${delegationId}", authToken, OK, DelegationDetailsDto.class) as DelegationDetailsDto
    }

    List<DelegationDto> getUserDelegations(AuthToken authToken) {
        webTestClientWrapper.getCollection('/delegations/my', authToken, OK, DelegationDto.class, ArrayList.class) as List<DelegationDto>
    }

    List<DelegationDto> getAllDelegations(AuthToken authToken) {
        webTestClientWrapper.getCollection('/delegations', authToken, OK, DelegationDto.class, ArrayList.class)
    }

    List<AccommodationDto> getDelegationAccommodations(AuthToken authToken, Long delegationId) {
        webTestClientWrapper.getCollection("/delegations/${delegationId}/accommodations", authToken, OK, AccommodationDto.class, ArrayList.class) as List<AccommodationDto>
    }

    WebTestClient.ResponseSpec tryGetAllDelegations(AuthToken authToken) {
        webTestClientWrapper.get('/delegations', authToken)
    }

    List<FlightDto> getDelegationFlights(AuthToken authToken, Long delegationId) {
        webTestClientWrapper.getCollection("/delegations/${delegationId}/flights", authToken, OK, FlightDto.class, ArrayList.class) as List<FlightDto>
    }

    List<DelegationDto> getDelegationsFilteredBy(LocalDateTime since, LocalDateTime until, AuthToken authToken) {
        DateTimeFormatter formatter = DATE_TIME_FORMAT
        webTestClientWrapper.getCollection("/delegations?since=${since.format(formatter)}&until=${until.format(formatter)}",
                authToken,
                OK,
                DelegationDto.class,
                ArrayList.class) as List<DelegationDto>
    }

    List<DelegationDto> getUserDelegationsFilteredBy(LocalDateTime since, LocalDateTime until, AuthToken authToken) {
        DateTimeFormatter formatter = DATE_TIME_FORMAT
        webTestClientWrapper.getCollection("/delegations/my?since=${since.format(formatter)}&until=${until.format(formatter)}",
                authToken,
                OK,
                DelegationDto.class,
                ArrayList.class) as List<DelegationDto>
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
