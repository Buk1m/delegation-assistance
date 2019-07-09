package com.idemia.ip.office.backend.delegation.assistant.integrations.providers

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDetailsDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.stereotype.Component
import org.springframework.test.web.reactive.server.WebTestClient

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.stream.Collectors

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_TIME_FORMAT
import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_TIME_FORMAT
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegationDetailsDto
import static org.springframework.http.HttpStatus.OK

@Component
class DelegationLogicProvider extends BaseLogicProvider {

    DelegationDetailsDto createDelegation(AuthToken authToken, DelegationDetailsDto delegationDto = anyDelegationDetailsDto()) {
        webTestClientWrapper.post('/delegations', authToken, delegationDto, OK, DelegationDetailsDto.class)
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

    WebTestClient.ResponseSpec tryGetAllDelegations(AuthToken authToken) {
        webTestClientWrapper.get('/delegations', authToken)
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

    DelegationDto patchDelegationStatus(AuthToken authToken, Long delegationId, DelegationStatus newDelegationStatus, Long version = 0) {
        DelegationDto patchDelegationDto = new DelegationDto(delegationStatus: newDelegationStatus, version: version)
        webTestClientWrapper.patch("/delegations/${delegationId}", authToken, patchDelegationDto, OK, DelegationDto.class)
    }
}
