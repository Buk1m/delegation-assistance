package com.idemia.ip.office.backend.delegation.assistant.integrations.providers

import org.springframework.stereotype.Component

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.AccommodationDto
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.http.HttpStatus

@Component
class AcommodationLogicProvider extends BaseLogicProvider {

    AccommodationDto createDelegationAccommodation(AuthToken authToken, AccommodationDto accommodationDto, Long delegationId) {
        webTestClientWrapper.post("/delegations/${delegationId}/accommodations", authToken, accommodationDto, HttpStatus.OK, AccommodationDto.class)
    }

    List<AccommodationDto> getDelegationAccommodations(AuthToken authToken, Long delegationId) {
        webTestClientWrapper.getCollection("/delegations/${delegationId}/accommodations", authToken, HttpStatus.OK, AccommodationDto.class, ArrayList.class) as List<AccommodationDto>
    }
}
