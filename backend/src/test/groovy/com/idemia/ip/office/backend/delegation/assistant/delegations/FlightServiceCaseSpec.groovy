package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.FlightService
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.FlightServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.OperationType
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.Flight
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.core.Authentication
import reactor.core.publisher.Mono
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyFlight
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyFlights
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUser
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUserDelegation

class FlightServiceCaseSpec extends Specification {

    DelegationService delegationService = Mock()
    DelegationRepository delegationRepository = Mock()
    Authentication authentication = Mock()

    FlightService flightService = new FlightServiceImpl(delegationService, delegationRepository)

    def 'Delegation flight is correctly assigned'() {
        given: 'User, delegation and flight'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)
            Flight flight = anyFlight()

        when: 'Flight is added to delegation'
            Flight result = flightService.addFlight(flight, authentication, delegation.getId()).block()

        then: 'Delegation has correctly assigned flight'
            1 * delegationService.getDelegation(_ as Long, _ as Authentication, _ as OperationType) >> Mono.just(delegation)
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
            flightService.addFlight(flight, authentication, delegation.getId()).block()

        then: 'Returns empty optional and throws exception'
            delegationService.getDelegation(_ as Long, _ as Authentication, _ as OperationType) >> {
                throw new EntityNotFoundException("no-delegation", Delegation.class)
            }
            thrown(EntityNotFoundException)
    }

    def 'Getting delegation flights by user which owns delegation'() {
        given: 'User, delegation and flight'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)
            List<Flight> flights = anyFlights()
            delegation.getFlights().addAll(flights)

        when: 'Getting flights'
            List<Flight> result = flightService.getFlights(delegation.getId(), authentication).collectList().block()

        then: 'Result size should be equals to delegation flights count'
            delegationService.getDelegation(_ as Long, _ as Authentication, _ as OperationType) >> Mono.just(delegation)
            result.size() == flights.size()
    }

    def 'Getting delegation flights by user when delegation does not exists'() {
        when: 'Getting flights of delegation with id 1 with does not exists'
            flightService.getFlights(1, authentication).collectList().block()

        then: 'Delegation service throws EntityNotFound'
            delegationService.getDelegation(_ as Long, _ as Authentication, _ as OperationType) >> {
                throw new EntityNotFoundException("no-delegation", Delegation.class)
            }
            thrown(EntityNotFoundException)
    }

    def 'Getting delegation flights by user which does not own delegation'() {
        when: 'Getting flights by somebody which does not own delegation with id 1'
            flightService.getFlights(1, authentication).collectList().block()

        then: 'Delegation service throws AccessDeniedException'
            delegationService.getDelegation(_ as Long, _ as Authentication, _ as OperationType) >> {
                throw new AccessDeniedException("not own delegation")
            }
            thrown(AccessDeniedException)
    }

    def 'Getting delegation flights by user with permissions'() {
        given: 'User, delegation and flight'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)
            List<Flight> flights = anyFlights()
            delegation.getFlights().addAll(flights)

        when: 'Getting flights'
            List<Flight> result = flightService.getFlights(delegation.getId(), authentication).collectList().block()

        then: 'Result size should be equals to delegation flights count'
            delegationService.getDelegation(_ as Long, _ as Authentication, _ as OperationType) >> Mono.just(delegation)
            result.size() == flights.size()
    }

    def 'Getting delegation flights when delegation does not exists'() {
        when: 'Getting flights of delegation with id 1'
            flightService.getFlights(1, authentication).collectList().block()

        then: 'Delegation service throws EntityNotFound'
            delegationService.getDelegation(_ as Long, _ as Authentication, _ as OperationType) >> {
                throw new EntityNotFoundException("no-delegation", Delegation.class)
            }
            thrown(EntityNotFoundException)
    }
}
