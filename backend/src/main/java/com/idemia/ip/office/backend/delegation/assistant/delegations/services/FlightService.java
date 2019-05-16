package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Flight;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FlightService {

    Mono<Flight> addFlight(Flight flight, String delegatedEmployeeLogin, Long delegationId);

    Flux<Flight> getFlights(Long delegationId);

    Flux<Flight> getFlights(String delegatedEmployeeLogin, Long delegationId);
}
