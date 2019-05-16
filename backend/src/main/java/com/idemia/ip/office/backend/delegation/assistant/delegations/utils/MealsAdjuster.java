package com.idemia.ip.office.backend.delegation.assistant.delegations.utils;

import com.idemia.ip.office.backend.delegation.assistant.entities.Meals;

import java.time.LocalDateTime;

public interface MealsAdjuster {

    Meals adjustNumberOfMeals(Meals meals, LocalDateTime delegationStartDate, LocalDateTime delegationEndDate);
}
