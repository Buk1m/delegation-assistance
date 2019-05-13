package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.AccommodationService
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.AccommodationServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.entities.Accommodation
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import reactor.core.publisher.Mono
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyAccommodation
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUser
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUserDelegation

class AccommodationCaseSpec extends Specification {

    DelegationService delegationService = Mock()
    DelegationRepository delegationRepository = Mock()

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

        then: 'Returns empty optional and throws exception'
            delegationService.getDelegation(delegation.getId(), user.getLogin()) >> {
                throw new EntityNotFoundException("no-delegation", Delegation.class)
            }
            thrown(EntityNotFoundException)
    }
}
