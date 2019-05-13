package com.idemia.ip.office.backend.delegation.assistant.integrations

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.AccommodationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.FlightDto
import com.idemia.ip.office.backend.delegation.assistant.integrations.base.BaseIntegrationSpec
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.test.web.reactive.server.WebTestClient

import java.time.LocalDateTime

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyAccommodationDto
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegationDTO
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyFlightDto

class DelegationsSpec extends BaseIntegrationSpec {

    def 'Should add delegation'() {
        given: 'Employee with given delegation'
            AuthToken employeeToken = businessLogicProvider.employeeToken()
            DelegationDto delegationDto = anyDelegationDTO()

        when: 'Adds delegation'
            DelegationDto postedDelegation = businessLogicProvider.createDelegation(employeeToken, delegationDto)

        then: 'Delegation is saved to db'
            DelegationDto existingDelegation = businessLogicProvider.getDelegation(employeeToken, postedDelegation.id)
            existingDelegation == postedDelegation
    }

    def 'Should return delegation for all privileged user'(String tokenOwner) {
        given: 'User and employee delegation'
            def token = businessLogicProvider."${tokenOwner}Token"() as AuthToken
            DelegationDto delegationDto = anyDelegationDTO()
            DelegationDto createdDelegation = businessLogicProvider.createDelegation(businessLogicProvider.employeeToken(), delegationDto)

        when: 'User tries to get delegation'
            DelegationDto responseDelegation = businessLogicProvider.getDelegation(token, createdDelegation.id)

        then: 'Retrieved delegation match to created'
            responseDelegation == createdDelegation

        where:
            tokenOwner << ['employee', 'travelManager', 'accountant', 'approver']
    }

    def 'Should get his delegations'() {
        given: 'Employee with existing delegations'
            AuthToken employeeToken = businessLogicProvider.employeeToken()
            int allDelegationsCount = 3
            List<DelegationDto> createdDelegations = businessLogicProvider.createDelegations(employeeToken, createDelegationsToFilter(allDelegationsCount))
            int filterCount = 2
            LocalDateTime sinceFilterDate = createdDelegations.get(0).startDate.minusDays(1)
            LocalDateTime untilFilterDate = createdDelegations.get(filterCount - 1).startDate.plusDays(1)

        when: 'Wants all his delegations'
            List<DelegationDto> delegationDtos = businessLogicProvider.getUserDelegations(employeeToken)

        then: 'Got all delegations'
            delegationDtos.size() == allDelegationsCount

        when: 'Wants to filter by date'
            delegationDtos = businessLogicProvider.getUserDelegationsFilteredBy(sinceFilterDate, untilFilterDate, employeeToken)

        then: 'Got delegations filtered by date'
            delegationDtos.size() == filterCount
            delegationDtos.stream().allMatch { d -> d.startDate.isBefore(untilFilterDate) && d.startDate.isAfter(sinceFilterDate) }
    }

    def 'Should not see all delegations'() {
        given: 'Employee and delegations'
            AuthToken employeeToken = businessLogicProvider.employeeToken()
            AuthToken tmToken = businessLogicProvider.travelManagerToken()
            businessLogicProvider.createDelegation(employeeToken)
            businessLogicProvider.createDelegation(tmToken)

        when: 'Employee tries to get all delegations'
            WebTestClient.ResponseSpec response = businessLogicProvider.tryGetAllDelegations(employeeToken)

        then: 'Has not got access'
            response.expectStatus().isForbidden()
    }

    def 'Should see all delegations'(String tokenOwner) {
        given: 'Employee, travel manager and delegations'
            def token = businessLogicProvider."${tokenOwner}Token"() as AuthToken
            businessLogicProvider.createDelegation(businessLogicProvider.employeeToken())
            businessLogicProvider.createDelegation(businessLogicProvider.travelManagerToken())
            int createdDelegations = 2

        when: 'Travel manager tries to get all delegations'
            List<DelegationDto> delegationDtos = businessLogicProvider.getAllDelegations(token)

        then: 'Got all delegations'
            delegationDtos.size() == createdDelegations

        where:
            tokenOwner << ['travelManager', 'accountant', 'approver']
    }

    def 'Should filter all delegations'(String tokenOwner) {
        given: 'Privileged users and delegations'
            def token = businessLogicProvider."${tokenOwner}Token"() as AuthToken
            int allDelegationsCount = 3
            int filterCount = 2
            List<DelegationDto> createdDelegations = businessLogicProvider.createDelegations(token, createDelegationsToFilter(allDelegationsCount))
            LocalDateTime sinceFilterDate = createdDelegations.get(0).startDate.minusDays(1)
            LocalDateTime untilFilterDate = createdDelegations.get(filterCount - 1).startDate.plusDays(1)

        when: 'Travel manager wants all delegations filtered by date'
            List<DelegationDto> delegationDtos = businessLogicProvider.getDelegationsFilteredBy(sinceFilterDate, untilFilterDate, token)

        then: 'Got all delegations filtered by date'
            delegationDtos.size() == filterCount
            delegationDtos.stream().allMatch { d -> d.startDate.isBefore(untilFilterDate) && d.startDate.isAfter(sinceFilterDate) }

        where:
            tokenOwner << ['travelManager', 'accountant', 'approver']
    }

    def 'Should add flight to delegations'() {
        given: 'Employee with delegation and flight'
            DelegationDto delegationDto = anyDelegationDTO()
            AuthToken employeeToken = businessLogicProvider.employeeToken()
            DelegationDto delegation = businessLogicProvider.createDelegation(employeeToken, delegationDto)
            FlightDto flightDto = anyFlightDto()

        when: 'Employee adds flight'
            FlightDto flight = businessLogicProvider.createDelegationFlight(employeeToken, flightDto, delegation.getId())

        then: 'Got returned flight'
            flight.getId() != null
            flightDto.getDeparturePlace() == flight.getDeparturePlace()
            flightDto.getArrivalPlace() == flight.getArrivalPlace()
            flightDto.getDepartureDate().toString() == flight.getDepartureDate().toString()
            flightDto.getArrivalDate().toString() == flight.getArrivalDate().toString()
    }

    def 'Should add accommodation to delegations'() {
        given: 'Employee with delegation and accommodation'
            DelegationDto delegationDto = anyDelegationDTO()
            AuthToken employeeToken = businessLogicProvider.employeeToken()
            DelegationDto delegation = businessLogicProvider.createDelegation(employeeToken, delegationDto)
            AccommodationDto accommodationDto = anyAccommodationDto()

        when: 'Employee adds flight'
            AccommodationDto accommodation = businessLogicProvider.createDelegationAccommodation(employeeToken, accommodationDto, delegation.getId())

        then: 'Got returned flight'
            accommodation.getId() != null
            accommodationDto.getHotelName() == accommodation.getHotelName()
            accommodationDto.getCheckInDate().toString() == accommodation.getCheckInDate().toString()
            accommodationDto.getCheckOutDate().toString() == accommodation.getCheckOutDate().toString()
    }

    List<DelegationDto> createDelegationsToFilter(int delegationsCount) {
        List<DelegationDto> delegations = []
        for (int i = 0; i < delegationsCount; i++) {
            DelegationDto delegation = anyDelegationDTO()
            delegation.startDate = delegation.startDate.plusDays(2 * i)
            delegation.endDate = delegation.endDate.plusDays(2 * i)
            delegations.add(delegation)
        }
        delegations
    }

}
