package com.idemia.ip.office.backend.delegation.assistant.countries.controllers;

import com.idemia.ip.office.backend.delegation.assistant.countries.dtos.CountryDto;
import com.idemia.ip.office.backend.delegation.assistant.countries.services.CountryService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
public class CountryController {

    private final CountryService countryService;
    private final ModelMapper modelMapper;

    public CountryController(CountryService countryService, ModelMapper modelMapper) {
        this.countryService = countryService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/countries")
    public Mono<ResponseEntity<List<CountryDto>>> getCountries() {
        return countryService.getAvailableCountries()
                .map(c -> modelMapper.map(c, CountryDto.class))
                .collectList()
                .map(ResponseEntity::ok);
    }
}
