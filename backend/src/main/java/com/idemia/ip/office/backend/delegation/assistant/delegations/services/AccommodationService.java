package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Accommodation;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AccommodationService {

    Mono<Accommodation> addAccommodation(Accommodation flight, String delegatedEmployeeLogin, Long delegationId);

    Flux<Accommodation> getAccommodations(Long delegationId);

    Flux<Accommodation> getAccommodations(String delegatedEmployeeLogin, Long delegationId);
}
