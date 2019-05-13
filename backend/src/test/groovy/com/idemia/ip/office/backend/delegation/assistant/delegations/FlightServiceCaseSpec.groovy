package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.FlightService
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.FlightServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.Flight
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import reactor.core.publisher.Mono
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyFlight
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUser
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUserDelegation

class FlightServiceCaseSpec extends Specification {

    DelegationService delegationService = Mock()
    DelegationRepository delegationRepository = Mock()

    FlightService flightService = new FlightServiceImpl(delegationService, delegationRepository)

    def 'Delegation flight is correctly assigned'() {
        given: 'User, delegation and flight'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)
            Flight flight = anyFlight()

        when: 'Flight is added to delegation'
            Flight result = flightService.addFlight(flight, user.getLogin(), delegation.getId()).block()

        then: 'Delegation has correctly assigned accommodation'
            1 * delegationService.getDelegation(delegation.getId(), user.getLogin()) >> Mono.just(delegation)
            1 * delegationRepository.save(delegation) >> { Delegation del ->
                del.flights.size() > 0
                del
            }
            result.getId() == flight.getId()
            result.getDeparturePlace() == flight.getDeparturePlace()
            result.getArrivalPlace() == flight.getArrivalPlace()
            result.getDepartureDate().toString() == flight.getDepartureDate().toString()
            result.getArrivalDate().toString() == flight.getArrivalDate().toString()
    }

    def 'User adding delegation flight and does not own delegation'() {
        given: 'User, delegation and flight'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)
            Flight flight = anyFlight()

        when: 'Flight is added to delegation'
            flightService.addFlight(flight, user.getLogin(), delegation.getId()).block()

        then: 'Returns empty optional and throws exception'
            delegationService.getDelegation(delegation.getId(), user.getLogin()) >> {
                throw new EntityNotFoundException("no-delegation", Delegation.class)
            }
            thrown(EntityNotFoundException)
    }
}
