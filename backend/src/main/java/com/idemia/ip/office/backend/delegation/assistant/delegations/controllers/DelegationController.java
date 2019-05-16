package com.idemia.ip.office.backend.delegation.assistant.delegations.controllers;

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.ChecklistDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDetailsDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationReportDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.MealsDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPatch;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPost;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Meals;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService;
import com.idemia.ip.office.backend.delegation.assistant.utils.RolesService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import static com.idemia.ip.office.backend.delegation.assistant.converters.ByteArrayToStringConverter.byteArrayToStringConverter;

@RestController
@Validated
public class DelegationController {

    private static final Logger LOG = LoggerFactory.getLogger(DelegationController.class);

    private DelegationService delegationService;
    private UserService userService;
    private ModelMapper modelMapper;

    public DelegationController(DelegationService delegationService,
            UserService userService,
            ModelMapper modelMapper) {
        this.delegationService = delegationService;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.modelMapper.addConverter(byteArrayToStringConverter);
    }

    @PostMapping("/delegations")
    @Validated(OnPost.class)
    public Mono<ResponseEntity<DelegationDetailsDto>> postDelegation(@Valid @RequestBody
            DelegationDetailsDto delegationDTO,
            Principal principal) {
        LOG.info("Creating delegation for user with login: {} {}", principal.getName(), delegationDTO);
        Delegation delegation = modelMapper.map(delegationDTO, Delegation.class);

        return userService.getUser(principal.getName())
                .flatMap(u -> delegationService.addDelegation(delegation, u, delegationDTO.getDestinationCountryId()))
                .map(this::mapToDelegationDetails)
                .map(ResponseEntity::ok);
    }

    @PreAuthorize("hasRole('ROLE_EMPLOYEE')")
    @GetMapping("/delegations/my")
    public Mono<ResponseEntity<List<DelegationDto>>> getMyDelegations(Principal principal,
            @RequestParam(required = false) DelegationStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime since,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime until) {
        LOG.info("Getting 'my' delegations by user with login:{}", principal.getName());
        Flux<Delegation> delegations = delegationService.getDelegations(principal.getName(), status, since, until);
        Mono<List<DelegationDto>> delegationsDto = delegations.map(e -> modelMapper.map(e, DelegationDto.class))
                .collectList();
        return delegationsDto.map(ResponseEntity::ok);
    }

    @GetMapping("/delegations/{delegationId}")
    public Mono<ResponseEntity<DelegationDetailsDto>> getDelegation(
            @PathVariable("delegationId") Long delegationId,
            Authentication authentication) {
        LOG.info("Getting delegation with id {} by user with login {}",
                delegationId,
                authentication.getName());

        return delegationService.getDelegationDetails(delegationId, authentication)
                .map(this::mapToDelegationDetails)
                .map(ResponseEntity::ok);
    }

    @PreAuthorize("hasRole('ROLE_EMPLOYEE')")
    @GetMapping("/delegations/{delegationId}/checklist")
    public Mono<ResponseEntity<ChecklistDto>> getChecklist(@PathVariable("delegationId") Long delegationId,
            Principal principal) {
        return delegationService.getDelegation(delegationId)
                .map(delegation -> {
                    if (!delegation.getDelegatedEmployee().getLogin().equals(principal.getName())) {
                        throw new AccessDeniedException("This checklist is owned by another user!");
                    }
                    return delegation.getChecklist();
                })
                .map(checklist -> modelMapper.map(checklist, ChecklistDto.class))
                .map(ResponseEntity::ok);
    }

    @PreAuthorize("hasAnyRole('ROLE_TRAVEL_MANAGER', 'ROLE_APPROVER', 'ROLE_ACCOUNTANT')")
    @GetMapping("/delegations")
    public Mono<ResponseEntity<List<DelegationDto>>> getDelegations(@RequestParam(required = false) String login,
            @RequestParam(required = false) DelegationStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime since,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime until,
            Principal principal) {
        LOG.info("Getting delegations by user with login:{}", principal.getName());
        Flux<Delegation> delegations = delegationService.getDelegations(login, status, since, until);
        Mono<List<DelegationDto>> delegationsDto = delegations.map(e -> modelMapper.map(e,
                DelegationDto.class))
                .collectList();
        return delegationsDto.map(ResponseEntity::ok);
    }

    @PatchMapping("/delegations/{delegationId}")
    @Validated(OnPatch.class)
    public Mono<ResponseEntity<DelegationDto>> patchDelegation(@Valid @RequestBody DelegationDto flowDelegationDTO,
            @PathVariable("delegationId") Long delegationId,
            Authentication authentication) {
        LOG.info("Patching delegation by user with login: {}. Delegation: {}",
                authentication.getName(),
                flowDelegationDTO);
        Delegation updateDelegation = modelMapper.map(flowDelegationDTO, Delegation.class);
        return delegationService.getDelegation(delegationId)
                .flatMap(d -> delegationService.validateNewStatus(updateDelegation, d, authentication.getAuthorities()))
                .flatMap(d -> delegationService.updateDelegation(updateDelegation, d))
                .map(d -> modelMapper.map(d, DelegationDto.class))
                .map(ResponseEntity::ok)
                .doOnError(AccessDeniedException.class,
                        (e) -> LOG.warn("User with login: {}, was trying to set delegation to status: {}",
                                authentication.getName(),
                                updateDelegation.getDelegationStatus()
                        ));
    }

    @PatchMapping("/delegations/{delegationId}/meals")
    @Validated(OnPatch.class)
    @PreAuthorize("hasRole('ROLE_EMPLOYEE')")
    public Mono<ResponseEntity<MealsDto>> patchDelegationMeals(@Valid @RequestBody MealsDto mealsDto,
            @PathVariable("delegationId") Long delegationId,
            Authentication authentication) {
        Meals meals = modelMapper.map(mealsDto, Meals.class);
        return delegationService.updateMeals(delegationId, authentication, meals)
                .map(updatedMeals -> modelMapper.map(updatedMeals, MealsDto.class))
                .map(ResponseEntity::ok);
    }

    @GetMapping("/delegations/{delegationId}/report")
    public Mono<ResponseEntity<DelegationReportDto>> downloadReport(
            @PathVariable("delegationId") Long delegationId,
            Authentication authentication) {
        LOG.info("Getting report of delegation with id {} by user with login {}",
                delegationId,
                authentication.getName());
        Mono<Delegation> delegation = RolesService.hasAnyRole(authentication.getAuthorities(),
                RolesService.travelManagerApproverAccoutant) ? delegationService.getDelegation(delegationId) :
                delegationService.getDelegation(delegationId, authentication.getName());
        Mono<DelegationReportDto> delegationReportDto = delegation.map(e -> modelMapper.map(e,
                DelegationReportDto.class));
        return delegationReportDto.map(ResponseEntity::ok);
    }

    private DelegationDetailsDto mapToDelegationDetails(Delegation delegation) {
        DelegationDetailsDto delegationDetailsDto = modelMapper.map(delegation, DelegationDetailsDto.class);
        delegationDetailsDto.setDestinationCountryId(null);
        return delegationDetailsDto;
    }
}
