package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Accommodation;
import org.springframework.security.core.Authentication;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AccommodationService {

    Mono<Accommodation> addAccommodation(Accommodation flight, Authentication authentication, Long delegationId);

    Flux<Accommodation> getAccommodations(Long delegationId, Authentication authentication);
}
