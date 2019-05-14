package com.idemia.ip.office.backend.delegation.assistant.countries.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Country;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CountryService {

    Flux<Country> getAvailableCountries();

    Mono<Country> getCountry(Long countryId);
}
