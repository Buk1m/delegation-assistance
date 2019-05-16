package com.idemia.ip.office.backend.delegation.assistant.delegations;

import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.MealsAdjuster
import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.MealsAdjusterImpl
import com.idemia.ip.office.backend.delegation.assistant.entities.Meals
import spock.lang.Specification
import spock.lang.Unroll

import static java.time.LocalDateTime.parse

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
            breakfasts | lunches | dinners | delegationStartDate         | delegationEndDate          | adjustedBreakfasts  | adjustedLunches       | adjustedDinners
            1          | 0       | 0       | parse('2019-03-01T10:00')   | parse('2019-03-01T11:00')  | 1                   | 0                     | 0
            0          | 1       | 0       | parse('2019-03-01T10:00')   | parse('2019-03-01T11:00')  | 0                   | 1                     | 0
            0          | 0       | 1       | parse('2019-03-01T10:00')   | parse('2019-03-01T11:00')  | 0                   | 0                     | 1
            1          | 1       | 1       | parse('2019-03-01T10:00')   | parse('2019-03-02T10:00')  | 1                   | 1                     | 1
            2          | 1       | 1       | parse('2019-03-01T10:00')   | parse('2019-03-02T12:00')  | 2                   | 1                     | 1
            2          | 2       | 1       | parse('2019-03-01T10:00')   | parse('2019-03-02T18:00')  | 2                   | 2                     | 1
            7          | 7       | 6       | parse('2019-03-01T10:00')   | parse('2019-03-08T09:00')  | 7                   | 7                     | 6
            7          | 7       | 7       | parse('2019-03-01T10:00')   | parse('2019-03-08T18:00')  | 7                   | 7                     | 7
            20         | null    | null    | parse('2019-03-01T10:00')   | parse('2019-03-08T18:00')  | 8                   | 8                     | 8
            20         | 0       | 0       | parse('2019-03-01T10:00')   | parse('2019-03-08T18:00')  | 8                   | 0                     | 0
            null       | null    | null    | parse('2019-03-01T10:00')   | parse('2019-03-08T18:00')  | 8                   | 8                     | 8
            20         | 20      | null    | parse('2019-03-01T10:00')   | parse('2019-03-08T18:00')  | 8                   | 8                     | 8
    }
}
