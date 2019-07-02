package com.idemia.ip.office.backend.delegation.assistant.delegations.utils;

import com.idemia.ip.office.backend.delegation.assistant.entities.Meals;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;

@Component
public class MealsAdjusterImpl implements MealsAdjuster {

    private static final double MILLIS_IN_DAY = Duration.ofDays(1).toMillis();

    public Meals adjustNumberOfMeals(Meals meals, LocalDateTime delegationStartDate, LocalDateTime delegationEndDate) {
        Duration delegationDuration = Duration.between(delegationStartDate, delegationEndDate);
        long delegationDurationInDays = delegationDuration.toDays();
        long maximumNumberOfMeal = ((long) Math.ceil((delegationDuration.toMillis() / MILLIS_IN_DAY)));
        if(meals!=null){
            meals.setBreakfasts(validateNumberOfMeal(meals.getBreakfasts(), delegationDurationInDays, maximumNumberOfMeal));
            meals.setDinners(validateNumberOfMeal(meals.getDinners(), delegationDurationInDays, maximumNumberOfMeal));
            meals.setLunches(validateNumberOfMeal(meals.getLunches(), delegationDurationInDays, maximumNumberOfMeal));
        }
       
        return meals;
    }

    private Long validateNumberOfMeal(Long numberOfMeal, Long delegationDurationInDays, Long maximumNumberOfMeal) {
        if (numberOfMeal == null || numberOfMeal < 0 || numberOfMeal > maximumNumberOfMeal) {
            return delegationDurationInDays;
        }
        return numberOfMeal;
    }
}
