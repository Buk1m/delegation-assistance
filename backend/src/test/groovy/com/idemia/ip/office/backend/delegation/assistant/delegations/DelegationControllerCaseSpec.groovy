package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.controllers.DelegationController
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto

import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus
import com.idemia.ip.office.backend.delegation.assistant.exceptions.ForbiddenAccessException
import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService
import org.modelmapper.ModelMapper
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import reactor.core.publisher.Mono
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED
import static com.idemia.ip.office.backend.delegation.assistant.utils.DelegationTestUtils.anyDelegationDTO

class DelegationControllerCaseSpec extends Specification {
    DelegationService delegationService = Mock()
    ModelMapper modelMapper = new ModelMapper()
    UserService userService = Mock()
    DelegationController delegationController = new DelegationController(delegationService, userService, modelMapper)
    String login = 'login'

    def 'Delegation is correctly mapped and saved'() {
        given: 'User is creating delegation'
            DelegationDto delegationDTO = anyDelegationDTO()
            String login = 'login'
            Authentication principal = new AuthenticationImpl("", "", login, [])

        when: 'User is posting DelegationDto'
            delegationController.postDelegation(delegationDTO, principal).block()

        then: 'User is in the system'
            1 * userService.getUser(login) >> Mono.just(new User(login))

        and: 'Delegation is saved'
            1 * delegationService.addDelegation(_ as Delegation, _ as User) >> { Delegation del, User user ->
                del.destinationLocation == delegationDTO.destinationLocation
                del.delegationObjective == delegationDTO.delegationObjective
                del.destinationCountryISO3 == delegationDTO.destinationCountryISO3
                del.startDate == delegationDTO.startDate
                del.endDate == delegationDTO.endDate
                Mono.just(Void)
            }
    }

    def 'Delegation is correctly mapped and updated'() {
        given: 'User is creating patch'
            Long delegationId = 1
            DelegationStatus preparedDelegationStatus = PREPARED
            DelegationDto patchDelegationDTO = new DelegationDto(delegationStatus: preparedDelegationStatus)
            Authentication principal = new AuthenticationImpl("", "", login, [])

        when: 'User is patching FlowDelegationDto'
            delegationController.patchDelegation(patchDelegationDTO, delegationId, principal).block()

        then: 'Delegation is updated'
            1 * delegationService.validateNewStatus(_ as Delegation, _ as Collection<? extends GrantedAuthority>) >>
                    { Delegation del, Collection<? extends GrantedAuthority> authorities ->
                        del.delegationStatus == preparedDelegationStatus
                        Mono.just(true)
                    }

            1 * delegationService.updateDelegation(delegationId, _ as Delegation) >>
                    { Long id, Delegation del ->
                        del.delegationStatus == preparedDelegationStatus
                        Mono.just(Void)
                    }
    }

    def 'Delegation with wrong status is not saved and an exception handled'() {
        given: 'User is creating patch with status without rights'
            DelegationDto patchDelegationDTO = new DelegationDto(delegationStatus: PREPARED)
            Authentication principal = new AuthenticationImpl("", "", login, [])

        when: 'User is patching FlowDelegationDto'
            delegationController.patchDelegation(patchDelegationDTO, 1, principal).block()

        then: 'Exception is handled'
            1 * delegationService.validateNewStatus(_ as Delegation, _ as Collection<? extends GrantedAuthority>) >> {
                Delegation del, Collection<? extends GrantedAuthority> authorities -> Mono.error(new ForbiddenAccessException('errorCode'))
            }

            thrown(ForbiddenAccessException)
    }
}