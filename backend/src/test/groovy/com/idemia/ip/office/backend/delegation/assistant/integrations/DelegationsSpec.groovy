package com.idemia.ip.office.backend.delegation.assistant.integrations

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.AccommodationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDetailsDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.FlightDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.MealsDto
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus
import com.idemia.ip.office.backend.delegation.assistant.integrations.base.BaseIntegrationSpec
import com.idemia.ip.office.backend.delegation.assistant.integrations.providers.AcommodationLogicProvider
import com.idemia.ip.office.backend.delegation.assistant.integrations.providers.AuthLogicProvider
import com.idemia.ip.office.backend.delegation.assistant.integrations.providers.DelegationLogicProvider
import com.idemia.ip.office.backend.delegation.assistant.integrations.providers.FlightLogicProvider
import com.idemia.ip.office.backend.delegation.assistant.integrations.providers.MealsLogicProvider
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.reactive.server.WebTestClient
import spock.lang.Unroll

import java.time.LocalDateTime

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegationDetailsDto
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyAccommodationDto
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyFlightDto

class DelegationsSpec extends BaseIntegrationSpec {

    @Autowired
    private DelegationLogicProvider delegationLogicProvider

    @Autowired
    private FlightLogicProvider flightLogicProvider

    @Autowired
    private AcommodationLogicProvider accommodationLogicProvider

    @Autowired
    private MealsLogicProvider mealsLogicProvider
    
    def 'Should add delegation'() {
        given: 'Employee with given delegation'
            AuthToken employeeToken = authLogicProvider.employeeToken()

        when: 'Adds delegation'
            DelegationDetailsDto postedDelegation = delegationLogicProvider.createDelegation(employeeToken)

        then: 'Delegation is saved to db'
            DelegationDetailsDto existingDelegation = delegationLogicProvider.getDelegation(employeeToken, postedDelegation.id)
            existingDelegation == postedDelegation
    }

    def 'Should return delegation for all privileged user'(String tokenOwner) {
        given: 'User and employee delegation'
            AuthToken token = authLogicProvider."${tokenOwner}Token"()
            DelegationDetailsDto createdDelegation = delegationLogicProvider.createDelegation(authLogicProvider.employeeToken())

        when: 'User tries to get delegation'
            DelegationDetailsDto responseDelegation = delegationLogicProvider.getDelegation(token, createdDelegation.id)

        then: 'Retrieved delegation match to created'
            responseDelegation == createdDelegation

        where:
            tokenOwner << ['employee', 'travelManager', 'accountant', 'approver']
    }

    def 'Should get his delegations'() {
        given: 'Employee with existing delegations'
            AuthToken employeeToken = authLogicProvider.employeeToken()
            int allDelegationsCount = 3
            List<DelegationDetailsDto> createdDelegations = delegationLogicProvider.createDelegations(employeeToken, createDelegationsToFilter(allDelegationsCount))
            int filterCount = 2
            LocalDateTime sinceFilterDate = createdDelegations.get(0).startDate.minusDays(1)
            LocalDateTime untilFilterDate = createdDelegations.get(filterCount - 1).startDate.plusDays(1)

        when: 'Wants all his delegations'
            List<DelegationDto> delegationDtos = delegationLogicProvider.getUserDelegations(employeeToken)

        then: 'Got all delegations'
            delegationDtos.size() == allDelegationsCount

        when: 'Wants to filter by date'
            delegationDtos = delegationLogicProvider.getUserDelegationsFilteredBy(sinceFilterDate, untilFilterDate, employeeToken)

        then: 'Got delegations filtered by date'
            delegationDtos.size() == filterCount
            delegationDtos.stream().allMatch { d -> d.startDate.isBefore(untilFilterDate) && d.startDate.isAfter(sinceFilterDate) }
    }

    def 'Should not see all delegations'() {
        given: 'Employee and delegations'
            AuthToken employeeToken = authLogicProvider.employeeToken()
            AuthToken tmToken = authLogicProvider.travelManagerToken()
            delegationLogicProvider.createDelegation(employeeToken)
            delegationLogicProvider.createDelegation(tmToken)

        when: 'Employee tries to get all delegations'
            WebTestClient.ResponseSpec response = delegationLogicProvider.tryGetAllDelegations(employeeToken)

        then: 'Has not got access'
            response.expectStatus().isForbidden()
    }

    def 'Should see all delegations'(String tokenOwner) {
        given: 'Employee, travel manager and delegations'
            AuthToken token = authLogicProvider."${tokenOwner}Token"()
            delegationLogicProvider.createDelegation(authLogicProvider.employeeToken())
            delegationLogicProvider.createDelegation(authLogicProvider.travelManagerToken())
            int createdDelegations = 2

        when: 'Travel manager tries to get all delegations'
            List<DelegationDto> delegationDtos = delegationLogicProvider.getAllDelegations(token)

        then: 'Got all delegations'
            delegationDtos.size() == createdDelegations

        where:
            tokenOwner << ['travelManager', 'accountant', 'approver']
    }

    def 'Should filter all delegations'(String tokenOwner) {
        given: 'Privileged users and delegations'
            AuthToken token = authLogicProvider."${tokenOwner}Token"()
            int allDelegationsCount = 3
            int filterCount = 2
            List<DelegationDetailsDto> createdDelegations = delegationLogicProvider.createDelegations(token, createDelegationsToFilter(allDelegationsCount))
            LocalDateTime sinceFilterDate = createdDelegations.get(0).startDate.minusDays(1)
            LocalDateTime untilFilterDate = createdDelegations.get(filterCount - 1).startDate.plusDays(1)

        when: 'Travel manager wants all delegations filtered by date'
            List<DelegationDto> delegationDtos = delegationLogicProvider.getDelegationsFilteredBy(sinceFilterDate, untilFilterDate, token)

        then: 'Got all delegations filtered by date'
            delegationDtos.size() == filterCount
            delegationDtos.stream().allMatch { d -> d.startDate.isBefore(untilFilterDate) && d.startDate.isAfter(sinceFilterDate) }

        where:
            tokenOwner << ['travelManager', 'accountant', 'approver']
    }

    @Unroll
    def 'Should #tokenOwner update delegation status to #status'(String tokenOwner, DelegationStatus status) {
        given: 'Privileged user and employees delegation'
            AuthToken token = authLogicProvider."${tokenOwner}Token"()
            AuthToken employeeToken = authLogicProvider.employeeToken()
            DelegationDetailsDto createDelegation = delegationLogicProvider.createDelegation(employeeToken)

        when: '#tokenOwner tries to update delegation to #status'
            DelegationDto updatedDelegation = delegationLogicProvider.patchDelegationStatus(token, createDelegation.id, status)

        then: 'Delagtaions status is updated'
            updatedDelegation.delegationStatus == status

        where:
            tokenOwner | status
            'employee' | PREPARED
            'employee' | CREATED
    }

    def 'Should add flight to delegations'() {
        given: 'Employee with delegation and flight'
            AuthToken employeeToken = authLogicProvider.employeeToken()
            DelegationDetailsDto delegation = delegationLogicProvider.createDelegation(employeeToken)
            FlightDto flightDto = anyFlightDto()

        when: 'Employee adds flight'
            FlightDto flight = flightLogicProvider.createDelegationFlight(employeeToken, flightDto, delegation.getId())

        then: 'Got returned flight'
            flight.getId() != null
            flightDto.getDeparturePlace() == flight.getDeparturePlace()
            flightDto.getArrivalPlace() == flight.getArrivalPlace()
            flightDto.getDepartureDate().toString() == flight.getDepartureDate().toString()
            flightDto.getArrivalDate().toString() == flight.getArrivalDate().toString()
    }

    def 'Should add accommodation to delegations'() {
        given: 'Employee with delegation and accommodation'
            AuthToken employeeToken = authLogicProvider.employeeToken()
            DelegationDetailsDto delegation = delegationLogicProvider.createDelegation(employeeToken)
            AccommodationDto accommodationDto = anyAccommodationDto()

        when: 'Employee adds flight'
            AccommodationDto accommodation = accommodationLogicProvider.createDelegationAccommodation(employeeToken, accommodationDto, delegation.getId())

        then: 'Got returned flight'
            accommodation.getId() != null
            accommodationDto.getHotelName() == accommodation.getHotelName()
            accommodationDto.getCheckInDate().toString() == accommodation.getCheckInDate().toString()
            accommodationDto.getCheckOutDate().toString() == accommodation.getCheckOutDate().toString()
    }

    def 'Should get delegations flights by owner'() {
        given: 'Employee going to delegation'
            DelegationDetailsDto delegationDetailsDto = anyDelegationDetailsDto()
            AuthToken employeeToken = authLogicProvider.employeeToken()
            DelegationDetailsDto delegation = delegationLogicProvider.createDelegation(employeeToken, delegationDetailsDto)

        and: 'Employee has two flights'
            flightLogicProvider.createDelegationFlight(employeeToken, anyFlightDto(), delegation.getId())
            flightLogicProvider.createDelegationFlight(employeeToken, anyFlightDto(), delegation.getId())

        when: 'Employee gets flights'
            List<FlightDto> flights = flightLogicProvider.getDelegationFlights(employeeToken, delegation.getId())

        then: 'Employee retrieved his flight'
            flights.size() == 2
    }

    @Unroll
    def 'Should get delegations flights by #tokenOwner'() {
        given: 'Employee going to delegation'
            AuthToken token = authLogicProvider."${tokenOwner}Token"()
            DelegationDetailsDto delegationDetailsDto = anyDelegationDetailsDto()
            AuthToken employeeToken = authLogicProvider.employeeToken()
            DelegationDetailsDto delegation = delegationLogicProvider.createDelegation(employeeToken, delegationDetailsDto)

        and: 'Employee has two flights'
            flightLogicProvider.createDelegationFlight(employeeToken, anyFlightDto(), delegation.getId())
            flightLogicProvider.createDelegationFlight(employeeToken, anyFlightDto(), delegation.getId())

        when: 'User with permissions gets flights'
            List<FlightDto> flights = flightLogicProvider.getDelegationFlights(token, delegation.getId())

        then: 'User retrieved his flight'
            flights.size() == 2

        where:
            tokenOwner << ['travelManager', 'accountant', 'approver']
    }

    def 'Should get delegations accommodations by owner'() {
        given: 'Employee going to delegation'
            AuthToken employeeToken = authLogicProvider.employeeToken()
            DelegationDetailsDto delegation = delegationLogicProvider.createDelegation(employeeToken)

        and: 'Employee has two accommodations'
            accommodationLogicProvider.createDelegationAccommodation(employeeToken, anyAccommodationDto(), delegation.getId())
            accommodationLogicProvider.createDelegationAccommodation(employeeToken, anyAccommodationDto(), delegation.getId())

        when: 'Employee gets accommodations'
            List<AccommodationDto> accommodations = accommodationLogicProvider.getDelegationAccommodations(employeeToken, delegation.getId())

        then: 'Employee retrieved his accommodations'
            accommodations.size() == 2
    }

    @Unroll
    def 'Should get delegations accommodations by #tokenOwner'() {
        given: 'Employee going to delegation'
            AuthToken token = authLogicProvider."${tokenOwner}Token"()
            AuthToken employeeToken = authLogicProvider.employeeToken()
            DelegationDetailsDto delegation = delegationLogicProvider.createDelegation(employeeToken)

        and: 'Employee has two accommodations'
            accommodationLogicProvider.createDelegationAccommodation(employeeToken, anyAccommodationDto(), delegation.getId())
            accommodationLogicProvider.createDelegationAccommodation(employeeToken, anyAccommodationDto(), delegation.getId())

        when: 'User with permissions gets accommodations'
            List<AccommodationDto> accommodations = accommodationLogicProvider.getDelegationAccommodations(token, delegation.getId())

        then: 'User retrieved his accommodations'
            accommodations.size() == 2

        where:
            tokenOwner << ['travelManager', 'accountant', 'approver']
    }

    def 'Should update delegation meals'() {
        given: 'Employee and updated meals'
            AuthToken employeeToken = authLogicProvider.employeeToken()
            DelegationDetailsDto delegation = delegationLogicProvider.createDelegation(employeeToken)
            MealsDto mealsDto = new MealsDto(lunches: 1, breakfasts: 2, dinners: 3, version: 0)

        when: 'Employee update delegation meals'
            MealsDto updatedMeals = mealsLogicProvider.updateDelegationMeals(employeeToken, mealsDto, delegation.getId())

        then: 'Employee has got updated meals'
            updatedMeals.breakfasts == mealsDto.breakfasts
            updatedMeals.lunches == mealsDto.lunches
            updatedMeals.dinners == mealsDto.dinners
    }

    List<DelegationDetailsDto> createDelegationsToFilter(int delegationsCount) {
        List<DelegationDetailsDto> delegations = []
        for (int i = 0; i < delegationsCount; i++) {
            DelegationDetailsDto delegation = anyDelegationDetailsDto()
            delegation.startDate = delegation.startDate.plusDays(2 * i)
            delegation.endDate = delegation.endDate.plusDays(2 * i)
            delegations.add(delegation)
        }
        delegations
    }
}
