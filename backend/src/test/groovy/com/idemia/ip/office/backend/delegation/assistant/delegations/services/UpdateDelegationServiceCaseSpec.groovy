package com.idemia.ip.office.backend.delegation.assistant.delegations.services

import com.idemia.ip.office.backend.delegation.assistant.configuration.ModelMapperConfiguration
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.MealsRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.MealsAdjuster
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.Meals
import spock.lang.Specification
import spock.lang.Unroll

import java.time.LocalDateTime

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegation

class UpdateDelegationServiceCaseSpec extends Specification {

    DelegationRepository delegationRepository = Mock()
    MealsRepository mealsRepository = Mock()
    MealsAdjuster mealsAdjuster = Mock()

    UpdateDelegationService updateDelegationService = new UpdateDelegationServiceImpl(
            delegationRepository,
            mealsRepository,
            mealsAdjuster,
            new ModelMapperConfiguration().getModelMapperPropertyConditionNotNull())

    def 'Flow status is properly mapped'() {
        given: 'New status and existing delegation'
            Delegation delegation = anyDelegation()
            Delegation newStatusDelegation = new Delegation([delegationStatus: CREATED])

        when: 'Delegation is updated'
            updateDelegationService.statusUpdate(delegation, newStatusDelegation).block()

        then: 'Status is properly mapped'
            delegation.delegationStatus == newStatusDelegation.delegationStatus
            delegationRepository.save(delegation) >> delegation

        and: 'Other properties are not mapped'
            delegation.destinationLocation != newStatusDelegation.destinationLocation
            delegation.delegationObjective != newStatusDelegation.delegationObjective
            delegation.startDate != newStatusDelegation.startDate
            delegation.endDate != newStatusDelegation.endDate
            delegation.advancePayment != newStatusDelegation.advancePayment
    }

    @Unroll
    def 'should update only changed values of meals: #newBreakfasts, #newLunches, #newDinners and return updated meals'() {
        given: 'Meals'
            Meals existingMeals = new Meals(breakfasts: 0, lunches: 0, dinners: 0)
            Meals meals = new Meals(breakfasts: newBreakfasts, lunches: newLunches, dinners: newDinners)

        when: 'invoke update method'
            1 * mealsAdjuster.adjustNumberOfMeals(_ as Meals, _ as LocalDateTime, _ as LocalDateTime) >> {
                Meals mealsToAdjust, LocalDateTime start, LocalDateTime end -> mealsToAdjust
            }
            1 * mealsRepository.save(_ as Meals) >> {
                Meals mealsToSave -> mealsToSave
            }
            Meals updatedMeals = updateDelegationService.updateMeals(meals, existingMeals, LocalDateTime.now(), LocalDateTime.now()).block()

        then: 'meals is properly updated'
            updatedMeals.breakfasts == correctBreakfasts
            updatedMeals.lunches == correctLunches
            updatedMeals.dinners == correctDinners

        where:
            newBreakfasts | newLunches | newDinners | correctBreakfasts | correctLunches | correctDinners
            1             | null       | null       | 1                 | 0              | 0
            null          | 1          | null       | 0                 | 1              | 0
            null          | null       | 1          | 0                 | 0              | 1
            1             | 1          | null       | 1                 | 1              | 0
            0             | 1          | 1          | 0                 | 1              | 1
            1             | null       | 1          | 1                 | 0              | 1
            1             | 1          | 1          | 1                 | 1              | 1
            null          | null       | null       | 0                 | 0              | 0
    }
}
