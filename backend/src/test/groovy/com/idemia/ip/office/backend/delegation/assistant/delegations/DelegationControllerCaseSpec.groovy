package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.controllers.DelegationController
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDetailsDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus
import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService
import org.modelmapper.ModelMapper
import org.springframework.http.ResponseEntity
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import reactor.core.publisher.Mono
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegation
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegationDetailsDto
import static org.springframework.http.HttpStatus.OK

class DelegationControllerCaseSpec extends Specification {

    DelegationService delegationService = Mock()
    UserService userService = Mock()
    ModelMapper modelMapper = new ModelMapper()
    DelegationController delegationController = new DelegationController(delegationService, userService, modelMapper)
    String login = 'login'

    def 'Delegation is correctly mapped and saved'() {
        given: 'User is creating delegation'
            DelegationDetailsDto delegationDTO = anyDelegationDetailsDto()
            String login = 'login'
            Authentication principal = new AuthenticationImpl('', '', login, [])

        when: 'User is posting DelegationDto'
            ResponseEntity<DelegationDetailsDto> response = delegationController.postDelegation(delegationDTO, principal).block()

        then: 'User is in the system'
            1 * userService.getUser(login) >> Mono.just(new User(login))

        and: 'Delegation is saved'
            response.statusCode == OK
            1 * delegationService.addDelegation(_ as Delegation, _ as User, _ as Long) >> { Delegation del, User user, Long countryId ->
                del.destinationLocation == delegationDTO.destinationLocation
                del.delegationObjective == delegationDTO.delegationObjective
                del.startDate == delegationDTO.startDate
                del.endDate == delegationDTO.endDate
                del.diet.currency == delegationDTO.diet.currency
                del.diet.perDiem == delegationDTO.diet.perDiem
                Mono.just(del)
            }
    }

    def 'Delegation is correctly mapped and updated'() {
        given: 'User is creating patch'
            Long delegationId = 1
            DelegationStatus preparedDelegationStatus = PREPARED
            DelegationDto updatedDelegationDto = new DelegationDto(delegationStatus: preparedDelegationStatus)
            Authentication principal = new AuthenticationImpl("", "", login, [])

        when: 'User is patching FlowDelegationDto'
            ResponseEntity<DelegationDto> response = delegationController.patchDelegation(updatedDelegationDto, delegationId, principal).block()

        then: 'Delegation is updated'
            response.statusCode == OK

            1 * delegationService.getDelegation(delegationId) >> Mono.just(anyDelegation())
            1 * delegationService.validateNewStatus(_ as Delegation, _ as Delegation, _ as Collection<? extends GrantedAuthority>) >>
                    { Delegation newDel, Delegation existingDel, Collection<? extends GrantedAuthority> authorities ->
                        newDel.delegationStatus == preparedDelegationStatus
                        Mono.just(existingDel)
                    }

            1 * delegationService.updateDelegation(_ as Delegation, _ as Delegation) >>
                    { Delegation newDel, Delegation existingDel ->
                        newDel.delegationStatus == preparedDelegationStatus
                        Mono.just(existingDel)
                    }
    }

    def 'Delegation with wrong status is not saved and an exception handled'() {
        given: 'User is creating patch with status without rights'
            DelegationDto patchDelegationDTO = new DelegationDto(delegationStatus: PREPARED)
            Authentication principal = new AuthenticationImpl("", "", login, [])

        when: 'User is patching FlowDelegationDto'
            delegationController.patchDelegation(patchDelegationDTO, 1, principal).block()

        then: 'Exception is handled'
            1 * delegationService.getDelegation(1) >> Mono.just(anyDelegation())
            1 * delegationService.validateNewStatus(_ as Delegation, _ as Delegation, _ as Collection<? extends GrantedAuthority>) >> {
                Delegation newDel, Delegation existingDel, Collection<? extends GrantedAuthority> authorities -> Mono.error(new AccessDeniedException('errorCode'))
            }

            thrown(AccessDeniedException)
    }
}
