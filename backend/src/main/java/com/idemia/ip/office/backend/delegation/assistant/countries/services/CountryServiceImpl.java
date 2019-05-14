package com.idemia.ip.office.backend.delegation.assistant.countries.services;

import com.idemia.ip.office.backend.delegation.assistant.countries.configuration.CountriesExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.countries.repositories.CountryRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.Country;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

@Service
@Transactional
public class CountryServiceImpl implements CountryService {

    private static final Logger LOG = LoggerFactory.getLogger(CountryServiceImpl.class);

    private final Scheduler scheduler;
    private final CountryRepository countryRepository;
    private final CountriesExceptionProperties countriesExceptionProperties;

    public CountryServiceImpl(Scheduler scheduler,
            CountryRepository countryRepository,
            CountriesExceptionProperties countriesExceptionProperties) {
        this.scheduler = scheduler;
        this.countryRepository = countryRepository;
        this.countriesExceptionProperties = countriesExceptionProperties;
    }

    @Override
    public Flux<Country> getAvailableCountries() {
        return Mono.fromCallable(countryRepository::findAll)
                .publishOn(scheduler)
                .flatMapIterable(cs -> cs);
    }

    @Override
    public Mono<Country> getCountry(Long countryId) {
        return Mono.fromCallable(() -> countryRepository.findById(countryId))
                .publishOn(scheduler)
                .map(c -> c.orElseThrow(() -> countryNotFoundException(countryId)));
    }

    private EntityNotFoundException countryNotFoundException(Long countryId) {
        LOG.info("Couldn't find country with id {}.", countryId);
        return new EntityNotFoundException(
                "Country not found.",
                countriesExceptionProperties.getCountryNotFound(),
                Country.class
        );
    }
}
