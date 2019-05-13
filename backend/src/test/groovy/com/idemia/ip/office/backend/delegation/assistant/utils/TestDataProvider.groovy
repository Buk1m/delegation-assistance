package com.idemia.ip.office.backend.delegation.assistant.utils

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.AccommodationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.FlightDto
import com.idemia.ip.office.backend.delegation.assistant.entities.*
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto
import org.springframework.data.domain.Sort

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED

class TestDataProvider {

    static DateTimeFormatter getDateTimeFormatter() {
        DateTimeFormatter.ofPattern('yyyy-MM-dd\'T\'HH:mm:ss')
    }

    static ChecklistTemplate anyChecklistTemplate() {
        new ChecklistTemplate(activities: [
                new ActivityTemplate(1L, 'task1', 'desc1', 0),
                new ActivityTemplate(2L, 'task2', 'desc2', 1),
                new ActivityTemplate(3L, 'task3', 'desc3', 2),
                new ActivityTemplate(4L, 'task4', 'desc4', 3)
        ])
    }

    static ChecklistTemplateDto anyChecklistTemplateDto() {
        new ChecklistTemplateDto(activities: [
                new ActivityTemplateDto(1l, "task1", "desc1", 0),
                new ActivityTemplateDto(2l, "task2", "desc2", 1),
                new ActivityTemplateDto(3l, "task3", "desc3", 2),
                new ActivityTemplateDto(4l, "task4", "desc4", 3),
        ])
    }

    static DelegationDto anyDelegationDTO() {
        DelegationDto.builder()
                .delegationObjective('Objective')
                .destinationLocation('Radom')
                .destinationCountryISO3('tst')
                .startDate(getLocalDateTime(getDateTimeFormatter()))
                .endDate(getLocalDateTimePlusYears(getDateTimeFormatter(), 1))
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
                .endDate(getLocalDateTimePlusYears(getDateTimeFormatter(), 1))
                .checklist(anyChecklist())
                .build()
    }

    static Checklist anyChecklist() {
        return new Checklist()
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

    static LocalDateTime getLocalDateTimePlusYears(DateTimeFormatter formatter, Long years) {
        getLocalDateTime(formatter).plusYears(years)
    }

    static LocalDateTime getLocalDateTimeMinusYears(DateTimeFormatter formatter, Long years) {
        getLocalDateTime(formatter).minusYears(years)
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
                .flights([])
                .accommodations([])
                .build()
    }

    static Delegation getDelegationToValidate(DelegationStatus delegationStatus = null, List<Expense> expenses = null) {
        return Delegation.builder()
                .delegationStatus(delegationStatus)
                .expenses(expenses)
                .build()
    }

    static Sort.Order anySortOrder() {
        return new Sort.Order(Sort.Direction.ASC, 'test')
    }

    static List<Expense> getListOfExpenses(int n) {
        return (0..n - 1).collect { anyExpense() }
    }

    static Flight anyFlight() {
        return Flight.builder()
                .id(1)
                .departurePlace("Warsaw")
                .arrivalPlace("Paris")
                .departureDate(getLocalDateTime(getDateTimeFormatter()))
                .arrivalDate(getLocalDateTimePlusYears(getDateTimeFormatter(), 1))
                .build()
    }

    static FlightDto anyFlightDto() {
        FlightDto.builder()
                .departurePlace('Warsaw')
                .arrivalPlace('Paris')
                .departureDate(getLocalDateTime(getDateTimeFormatter()))
                .arrivalDate(getLocalDateTimePlusYears(getDateTimeFormatter(), 1))
                .build()

    }

    static Accommodation anyAccommodation() {
        return Accommodation.builder()
                .id(1)
                .hotelName("Gloria Hotel")
                .checkInDate(getLocalDateTime(getDateTimeFormatter()))
                .checkOutDate(getLocalDateTimePlusYears(getDateTimeFormatter(), 1))
                .build()
    }

    static AccommodationDto anyAccommodationDto() {
        AccommodationDto.builder()
                .hotelName("Gloria Hotel")
                .checkInDate(getLocalDateTime(getDateTimeFormatter()))
                .checkOutDate(getLocalDateTimePlusYears(getDateTimeFormatter(), 1))
                .build()
    }
}
