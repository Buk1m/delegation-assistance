package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.controllers.DelegationController
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService
import org.modelmapper.ModelMapper
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import reactor.core.publisher.Mono
import spock.lang.Specification

import java.time.LocalDateTime

class DelegationControllerCaseSpec extends Specification {
    DelegationService delegationService = Mock()
    ModelMapper modelMapper = new ModelMapper()
    UserService userService = Mock()
    DelegationController delegationController = new DelegationController(delegationService, userService, modelMapper)

    def 'Delegation is correctly mapped and saved'() {
        given: 'User is creating delegation'
            DelegationDto delegationDTO = anyDelegationDTO()
            String login = 'login'
            Authentication principal = new AuthenticationImpl("", "", login, new ArrayList<GrantedAuthority>())

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

    DelegationDto anyDelegationDTO() {
        DelegationDto.builder()
                .delegationObjective('Objective')
                .destinationLocation('Radom')
                .destinationCountryISO3('tst')
                .startDate(LocalDateTime.parse('2020-01-01T01:01:01'))
                .endDate(LocalDateTime.parse('2020-01-03T01:01:01'))
                .build()
    }
}
