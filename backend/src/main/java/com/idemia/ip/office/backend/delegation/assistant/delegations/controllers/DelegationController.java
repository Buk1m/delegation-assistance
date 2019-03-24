package com.idemia.ip.office.backend.delegation.assistant.delegations.controllers;

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDTO;
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

import javax.validation.Valid;
import java.security.Principal;

@RestController("/delegations")
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

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Void> postDelegation(@Valid @RequestBody DelegationDTO delegationDTO, Principal principal) {
        LOG.info("Creating delegation for user with login: {} {}", principal.getName(), delegationDTO);
        Delegation delegation = modelMapper.map(delegationDTO, Delegation.class);
        return userService.getUser(principal.getName())
                .flatMap(u -> delegationService.addDelegation(delegation, u));
    }
}
