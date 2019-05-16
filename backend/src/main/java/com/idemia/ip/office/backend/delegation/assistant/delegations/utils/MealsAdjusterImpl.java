package com.idemia.ip.office.backend.delegation.assistant.delegations.utils;

import com.idemia.ip.office.backend.delegation.assistant.entities.Meals;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;

@Component
public class MealsAdjusterImpl implements MealsAdjuster {

    private static final double HOURS_IN_DAY = 24.0;

    public Meals adjustNumberOfMeals(Meals meals, LocalDateTime delegationStartDate, LocalDateTime delegationEndDate) {
        Duration delegationDuration = Duration.between(delegationStartDate, delegationEndDate);
        long delegationDurationInHours = delegationDuration.toHours();
        long maximumNumberOfMeal = ((long) Math.ceil((delegationDurationInHours / HOURS_IN_DAY)));

        meals.setBreakfasts(validateNumberOfMeal(meals.getBreakfasts(), maximumNumberOfMeal));
        meals.setDinners(validateNumberOfMeal(meals.getDinners(), maximumNumberOfMeal));
        meals.setLunches(validateNumberOfMeal(meals.getLunches(), maximumNumberOfMeal));

        return meals;
    }

    private Long validateNumberOfMeal(Long numberOfMeal, Long maximumNumberOfMeal) {
        if (numberOfMeal == null || numberOfMeal < 0 || numberOfMeal > maximumNumberOfMeal) {
            return maximumNumberOfMeal;
        }
        return numberOfMeal;
    }
}
