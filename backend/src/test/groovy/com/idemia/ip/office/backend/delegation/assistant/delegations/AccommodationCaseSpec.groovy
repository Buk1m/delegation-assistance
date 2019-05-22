package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.AccommodationService
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.AccommodationServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.entities.Accommodation
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.core.Authentication
import reactor.core.publisher.Mono
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyAccommodation
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyAccommodations
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUser
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUserDelegation

class AccommodationCaseSpec extends Specification {

    DelegationService delegationService = Mock()
    DelegationRepository delegationRepository = Mock()
    Authentication authentication = Mock()

    AccommodationService accommodationService = new AccommodationServiceImpl(delegationService, delegationRepository)

    def 'Delegation accommodation is correctly assigned'() {
        given: 'User, delegation and accommodation'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)
            Accommodation accommodation = anyAccommodation()

        when: 'Accommodation is added to delegation'
            Accommodation result = accommodationService.addAccommodation(accommodation, user.getLogin(), delegation.getId()).block()

        then: 'Delegation has correctly assigned accommodation'
            1 * delegationService.getDelegation(delegation.getId(), user.getLogin()) >> Mono.just(delegation)
            1 * delegationRepository.save(delegation) >> { Delegation del ->
                del.accommodations.size() > 0
                del
            }
            result.hotelName == accommodation.hotelName
            result.checkInDate.toString() == accommodation.checkInDate.toString()
            result.checkOutDate.toString() == accommodation.checkOutDate.toString()
    }

    def 'User adding delegation accommodation and does not own delegation'() {
        given: 'User, delegation and accommodation'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)
            Accommodation accommodation = anyAccommodation()

        when: 'Accommodation is added to delegation'
            accommodationService.addAccommodation(accommodation, user.getLogin(), delegation.getId()).block()

        then: 'Delegation service throws EntityNotFound'
            delegationService.getDelegation(_ as Long, _ as String) >> {
                throw new EntityNotFoundException("no-delegation", Delegation.class)
            }
            thrown(EntityNotFoundException)
    }

    def 'Getting delegation accommodations by user which owns delegation'() {
        given: 'User, delegation and accommodations'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)
            List<Accommodation> accommodations = anyAccommodations()
            delegation.getAccommodations().addAll(accommodations)

        when: 'Getting accommodations'
            List<Accommodation> result = accommodationService.getAccommodations(delegation.getId(), authentication).collectList().block()

        then: 'Result size should be equals to delegation accommodations count'
            delegationService.getDelegationValidated(_ as Long, _ as Authentication) >> Mono.just(delegation)
            result.size() == accommodations.size()
    }

    def 'Getting delegation accommodations by user when delegation does not exists'() {
        when: 'Getting accommodations of delegation with id 1 which does not exists'
            accommodationService.getAccommodations(1, authentication).collectList().block()

        then: 'Delegation service throws EntityNotFound'
            delegationService.getDelegationValidated(_ as Long, _ as Authentication) >> {
                throw new EntityNotFoundException("no-delegation", Delegation.class)
            }
            thrown(EntityNotFoundException)
    }

    def 'Getting delegation accommodations by user which does not own delegation'() {
        when: 'Getting accommodations by somebody which does not own delegation with id 1'
            accommodationService.getAccommodations(1, authentication).collectList().block()

        then: 'Delegation service throws AccessDeniedException'
            delegationService.getDelegationValidated(_ as Long, _ as Authentication) >> {
                throw new AccessDeniedException("not own delegation")
            }
            thrown(AccessDeniedException)
    }

    def 'Getting delegation accommodations by user with permissions'() {
        given: 'User, delegation and accommodations'
            Delegation delegation = getUserDelegation(1, user)
            List<Accommodation> accommodations = anyAccommodations()
            delegation.getAccommodations().addAll(accommodations)

        when: 'Getting accommodations'
            List<Accommodation> result = accommodationService.getAccommodations(delegation.getId(), authentication).collectList().block()

        then: 'Result size should be equals to delegation accommodations count'
            delegationService.getDelegationValidated(delegation.getId(), authentication) >> Mono.just(delegation)
            result.size() == accommodations.size()
    }

    def 'Getting delegation accommodations by user with permissions when delegation does not exists'() {
        when: 'Getting accommodations of delegation with id 1'
            accommodationService.getAccommodations(1, authentication).collectList().block()

        then: 'Delegation service throws EntityNotFound'
            delegationService.getDelegationValidated(_ as Long, _ as Authentication) >> {
                throw new EntityNotFoundException("no-delegation", Delegation.class)
            }
            thrown(EntityNotFoundException)
    }
}
