package com.idemia.ip.office.backend.delegation.assistant.integrations.providers

import org.springframework.stereotype.Component

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.FlightDto
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken

import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.OK

@Component
class FlightLogicProvider extends BaseLogicProvider {

    FlightDto createDelegationFlight(AuthToken authToken, FlightDto flightDto, Long delegationId) {
        webTestClientWrapper.post("/delegations/${delegationId}/flights", authToken, flightDto, OK, FlightDto.class)
    }

    List<FlightDto> getDelegationFlights(AuthToken authToken, Long delegationId) {
        webTestClientWrapper.getCollection("/delegations/${delegationId}/flights", authToken, OK, FlightDto.class, ArrayList.class) as List<FlightDto>
    }
}
