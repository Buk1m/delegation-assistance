package com.idemia.ip.office.backend.delegation.assistant.delegations.controllers;

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@Transactional(readOnly = true)
public class DelegationController {

    private static final Logger LOG = LoggerFactory.getLogger(DelegationController.class);

    private DelegationService delegationService;
    private UserService userService;
    private ModelMapper modelMapper;

    public DelegationController(DelegationService delegationService, UserService userService, ModelMapper modelMapper) {
        this.delegationService = delegationService;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/delegations")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Void> postDelegation(@Valid @RequestBody DelegationDto delegationDTO, Principal principal) {
        LOG.info("Creating delegation for user with login: {} {}", principal.getName(), delegationDTO);
        Delegation delegation = modelMapper.map(delegationDTO, Delegation.class);
        return userService.getUser(principal.getName())
                .flatMap(u -> delegationService.addDelegation(delegation, u));
    }

    @PreAuthorize("hasRole('ROLE_EMPLOYEE')")
    @GetMapping("/delegations/my")
    public Mono<ResponseEntity<List<DelegationDto>>> getMyDelegations(Principal principal,
            @RequestParam(required = false) DelegationStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime since,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime until) {
        Flux<Delegation> delegations = delegationService.getDelegations(principal.getName(), status, since, until);
        Mono<List<DelegationDto>> delegationsDto = delegations.map(e -> modelMapper.map(e, DelegationDto.class))
                .collectList();
        return delegationsDto.map(ResponseEntity::ok);
    }

    @PreAuthorize("hasAnyRole('ROLE_TRAVEL_MANAGER', 'ROLE_APPROVER', 'ROLE_ACCOUNTANT')")
    @GetMapping("/delegations")
    public Mono<ResponseEntity<List<DelegationDto>>> getDelegations(@RequestParam(required = false) String login,
            @RequestParam(required = false) DelegationStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime since,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime until) {
        Flux<Delegation> delegations = delegationService.getDelegations(login, status, since, until);
        Mono<List<DelegationDto>> delegationsDto = delegations.map(e -> modelMapper.map(e, DelegationDto.class))
                .collectList();
        return delegationsDto.map(ResponseEntity::ok);
    }
}
