package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Flight;
import org.springframework.security.core.Authentication;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FlightService {

    Mono<Flight> addFlight(Flight flight, Authentication authentication, Long delegationId);

    Flux<Flight> getFlights(Long delegationId, Authentication authentication);
}
