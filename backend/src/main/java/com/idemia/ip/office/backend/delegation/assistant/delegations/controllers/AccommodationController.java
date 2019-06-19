package com.idemia.ip.office.backend.delegation.assistant.delegations.controllers;

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.AccommodationDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.AccommodationService;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPost;
import com.idemia.ip.office.backend.delegation.assistant.entities.Accommodation;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
public class AccommodationController {
    private static final Logger LOG = LoggerFactory.getLogger(DelegationController.class);

    private AccommodationService accommodationService;
    private ModelMapper modelMapper;

    public AccommodationController(AccommodationService accommodationService, ModelMapper modelMapper) {
        this.accommodationService = accommodationService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/delegations/{delegationId}/accommodations")
    @Validated(OnPost.class)
    public Mono<ResponseEntity<AccommodationDto>> postDelegationAccommodation(
            @Valid @RequestBody AccommodationDto accommodationDto,
            @PathVariable("delegationId") Long delegationId,
            Authentication authentication) {
        LOG.info("User: {} wants to add accommodations: {} to delegation with id: {}",
                authentication.getName(),
                accommodationDto,
                delegationId);
        Accommodation accommodation = modelMapper.map(accommodationDto, Accommodation.class);
        return accommodationService.addAccommodation(accommodation,
                authentication,
                delegationId)
                .map(e -> modelMapper.map(e, AccommodationDto.class))
                .map(ResponseEntity::ok);
    }

    @GetMapping("/delegations/{delegationId}/accommodations")
    @Validated(OnPost.class)
    public Mono<ResponseEntity<List<AccommodationDto>>> getDelegationFlight(
            @PathVariable("delegationId") Long delegationId,
            Authentication authentication) {
        Flux<Accommodation> accommodations = accommodationService.getAccommodations(delegationId, authentication);
        Mono<List<AccommodationDto>> accommodationsDto = accommodations.map(e -> modelMapper.map(e,
                AccommodationDto.class))
                .collectList();
        return accommodationsDto.map(ResponseEntity::ok);
    }
}
