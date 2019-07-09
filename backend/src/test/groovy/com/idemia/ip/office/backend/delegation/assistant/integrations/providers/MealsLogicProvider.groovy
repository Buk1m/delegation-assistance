package com.idemia.ip.office.backend.delegation.assistant.integrations.providers

import org.springframework.stereotype.Component

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.MealsDto
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyMealsDto
import static org.springframework.http.HttpStatus.OK

@Component
class MealsLogicProvider extends BaseLogicProvider {

    MealsDto updateDelegationMeals(AuthToken authToken, MealsDto mealsDto = anyMealsDto(), Long delegationId) {
        webTestClientWrapper.patch("/delegations/${delegationId}/meals", authToken, mealsDto, OK, MealsDto.class)
    }
}
