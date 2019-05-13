package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Flight;
import reactor.core.publisher.Mono;

public interface FlightService {

    Mono<Flight> addFlight(Flight flight, String delegatedEmployeeLogin, Long delegationId);
}
