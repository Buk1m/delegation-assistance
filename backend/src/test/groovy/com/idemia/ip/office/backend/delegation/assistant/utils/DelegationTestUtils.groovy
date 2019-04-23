package com.idemia.ip.office.backend.delegation.assistant.utils


import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense
import com.idemia.ip.office.backend.delegation.assistant.entities.File
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto

import java.time.LocalDateTime

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED

class DelegationTestUtils {
    static DelegationDto anyDelegationDTO() {
        DelegationDto.builder()
                .delegationObjective('Objective')
                .destinationLocation('Radom')
                .destinationCountryISO3('tst')
                .startDate(LocalDateTime.parse('2020-01-01T01:01:01'))
                .endDate(LocalDateTime.parse('2020-01-03T01:01:01'))
                .build()
    }

    static Delegation getDelegationWithStatus(DelegationStatus delegationStatus) {
        Delegation.builder()
                .delegationStatus(delegationStatus)
                .build()
    }

    static Delegation anyDelegation() {
        return Delegation.builder()
                .delegationStatus(CREATED)
                .delegationObjective('Test')
                .destinationLocation('Radom')
                .destinationCountryISO3('iso')
                .startDate(LocalDateTime.parse('2020-01-01T01:01:01'))
                .endDate(LocalDateTime.parse('2020-01-03T01:01:01'))
                .build()
    }

    static Expense anyExpense() {
        return Expense.builder()
                .expenseCurrency('EUR')
                .expenseName('The swabs')
                .expenseValue(3444.35)
                .build()
    }

    static User getUser(Long id = null, String login = null) {
        return User.builder()
                .login(login)
                .id(id)
                .build()
    }

    static Delegation getUserDelegation(Long id = null, User user = null) {
        return Delegation.builder()
                .id(id)
                .delegatedEmployee(user)
                .build()
    }

    static Delegation getDelegationToValidate(DelegationStatus delegationStatus = null, List<Expense> expenses = null) {
        return Delegation.builder()
                .delegationStatus(delegationStatus)
                .expenses(expenses)
                .build()
    }

    static ExpenseDto anyExpenseDto() {
        return ExpenseDto.builder()
                .expenseCurrency('EUR')
                .expenseName('The swabs')
                .expenseValue(3444.35)
                .build()
    }

    static File anyFile() {
        return File.builder()
                .filePath('filePath')
                .userFilename('userFilename')
                .build()
    }
}
