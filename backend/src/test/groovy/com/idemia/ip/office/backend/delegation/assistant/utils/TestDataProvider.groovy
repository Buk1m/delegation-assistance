package com.idemia.ip.office.backend.delegation.assistant.utils

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.entities.*
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED

class TestDataProvider {

    static DateTimeFormatter getDateTimeFormatter() {
        DateTimeFormatter.ofPattern('yyyy-MM-dd\'T\'HH:mm:ss')
    }

    static ActivityTemplateDto anyActivityTemplateDto() {
        new ActivityTemplateDto([task: 'task', description: 'description'])
    }

    static ChecklistTemplate anyChecklistTemplate() {
        ChecklistTemplate checklist = new ChecklistTemplate()
        checklist.setId(1L)
        ActivityTemplate task1 = new ActivityTemplate('task1', 'desc1')
        ActivityTemplate task2 = new ActivityTemplate('task2', 'desc2')
        checklist.getActivities().add(task1)
        checklist.getActivities().add(task2)
        return checklist
    }

    static DelegationDto anyDelegationDTO() {
        DelegationDto.builder()
                .delegationObjective('Objective')
                .destinationLocation('Radom')
                .destinationCountryISO3('tst')
                .startDate(getLocalDateTime(getDateTimeFormatter()))
                .endDate(getLocalDateTime(getDateTimeFormatter()))
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
                .startDate(getLocalDateTime(getDateTimeFormatter()))
                .endDate(getLocalDateTime(getDateTimeFormatter()))
                .build()
    }

    static Expense anyExpense() {
        return Expense.builder()
                .expenseCurrency('EUR')
                .expenseName('The swabs')
                .expenseValue(3444.35)
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

    static LocalDateTime getLocalDateTime(DateTimeFormatter formatter) {
        LocalDateTime.parse(LocalDateTime.now().format(formatter))
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
}
