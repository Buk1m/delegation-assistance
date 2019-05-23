package com.idemia.ip.office.backend.delegation.assistant.delegations;

import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.MealsAdjuster
import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.MealsAdjusterImpl
import com.idemia.ip.office.backend.delegation.assistant.entities.Meals
import spock.lang.Specification
import spock.lang.Unroll

import java.time.LocalDateTime

import static java.time.LocalDateTime.now

class MealsAdjusterCaseSpec extends Specification {

    MealsAdjuster mealsAdjuster = new MealsAdjusterImpl()

    @Unroll
    def 'should correctly adjust number of meals: #breakfasts, #lunches, #dinners, #delegationStartDate, #delegationEndDate'() {
        given: 'meals to adjust'
            Meals meals = new Meals(breakfasts: breakfasts, lunches: lunches, dinners: dinners)

        when: 'adjust meals'
            Meals adjustedMeals = mealsAdjuster.adjustNumberOfMeals(meals, delegationStartDate, delegationEndDate)

        then: 'meals are adjusted correctly'
            adjustedMeals.breakfasts == adjustedBreakfasts
            adjustedMeals.lunches == adjustedLunches
            adjustedMeals.dinners == adjustedDinners

        where:
            breakfasts | lunches | dinners | delegationStartDate | delegationEndDate                                               | adjustedBreakfasts | adjustedLunches | adjustedDinners
            0          | 1       | 0       | now()               | now().plusHours(1)                                              | 0                  | 1               | 0
            0          | 0       | 1       | now()               | now().plusHours(1)                                              | 0                  | 0               | 1
            1          | 1       | 1       | now()               | now().plusDays(1)                                               | 1                  | 1               | 1
            2          | 1       | 1       | now()               | now().plusDays(1).plusHours(2)                                  | 2                  | 1               | 1
            2          | 2       | 1       | now()               | now().plusDays(1).plusHours(8)                                  | 2                  | 2               | 1
            7          | 7       | 6       | now()               | now().plusDays(6).plusHours(23)                                 | 7                  | 7               | 6
            7          | 7       | 7       | now()               | now().plusDays(7).plusHours(8)                                  | 7                  | 7               | 7
            20         | null    | null    | now()               | now().plusDays(7).plusHours(8)                                  | 7                  | 7               | 7
            20         | 0       | 0       | now()               | now().plusDays(7).plusHours(8)                                  | 7                  | 0               | 0
            null       | null    | null    | now()               | now().plusDays(7).plusHours(8)                                  | 7                  | 7               | 7
            20         | 20      | null    | now()               | now().plusDays(7).plusHours(8)                                  | 7                  | 7               | 7
            null       | null    | null    | now()               | now().plusDays(1).plusHours(23).plusMinutes(59)                 | 1                  | 1               | 1
            null       | null    | null    | now()               | now().plusDays(1).plusHours(23).plusMinutes(59).plusSeconds(59) | 1                  | 1               | 1
            null       | null    | null    | now()               | now().plusDays(2)                                               | 2                  | 2               | 2
            3          | 2       | 2       | now()               | now().plusDays(2).plusSeconds(1)                                | 3                  | 2               | 2
            3          | 2       | 2       | now()               | now().plusDays(2).plusSeconds(1)                                | 3                  | 2               | 2
            3          | 3       | 3       | now()               | now().plusDays(2).plusSeconds(1)                                | 3                  | 3               | 3
    }
}
