package com.idemia.ip.office.backend.delegation.assistant.utils

import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ActivityTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.checklists.dtos.ChecklistTemplateDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.AccommodationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDetailsDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DelegationDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.DietDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.FlightDto
import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.MealsDto
import com.idemia.ip.office.backend.delegation.assistant.entities.Accommodation
import com.idemia.ip.office.backend.delegation.assistant.entities.ActivityTemplate
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist
import com.idemia.ip.office.backend.delegation.assistant.entities.ChecklistTemplate
import com.idemia.ip.office.backend.delegation.assistant.entities.Country
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.Diet
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense
import com.idemia.ip.office.backend.delegation.assistant.entities.File
import com.idemia.ip.office.backend.delegation.assistant.entities.Flight
import com.idemia.ip.office.backend.delegation.assistant.entities.Meals
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.dtos.CurrencyRatesDto
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.dtos.RatesDto
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeInfo
import org.springframework.data.domain.Sort

import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_FORMAT
import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_TIME_FORMAT
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED

class TestDataProvider {
    static ActivityTemplateDto anyActivityTemplateDto() {
        new ActivityTemplateDto(task: 'task', description: 'description')
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

    static Country anyCountry() {
        new Country(countryName: 'Poland')
    }

    static DelegationDto anyDelegationDTO() {
        DelegationDto.builder()
                .delegationObjective('Objective')
                .destinationLocation('Radom')
                .countryName('Poland')
                .startDate(getLocalDateTime(DATE_TIME_FORMAT))
                .endDate(getLocalDateTime(DATE_TIME_FORMAT).plusDays(2))
                .build()
    }

    static DelegationDetailsDto anyDelegationDetailsDto() {
        DelegationDetailsDto.builder()
                .delegationObjective('Objective')
                .destinationLocation('Radom')
                .destinationCountryId(1)
                .diet(anyDietDto())
                .meals(anyMealsDto())
                .startDate(getLocalDateTime(DATE_TIME_FORMAT))
                .endDate(getLocalDateTimePlusYears(DATE_TIME_FORMAT, 1))
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
                .advancePayment(new BigDecimal(500))
                .destinationCountry(anyCountry())
                .diet(anyDiet())
                .meals(anyMeals())
                .startDate(getLocalDateTime(DATE_TIME_FORMAT))
                .endDate(getLocalDateTimePlusYears(DATE_TIME_FORMAT, 1))
                .checklist(anyChecklist())
                .build()
    }

    static Diet anyDiet() {
        new Diet(currency: 'PLN', perDiem: 50)
    }

    static DietDto anyDietDto() {
        new DietDto(currency: 'PLN', perDiem: 50)
    }

    static Meals anyMeals() {
        new Meals(breakfasts: 1, dinners: 2, lunches: 3)
    }

    static MealsDto anyMealsDto() {
        new MealsDto(breakfasts: 1, dinners: 2, lunches: 3)
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

    static ExchangeInfo anyExchangeInfo() {
        return new ExchangeInfo(currencyCode: 'EUR', exchangeDate: getLocalDate(DATE_FORMAT))
    }

    static ExchangeInfo getExchangeInfo(String currencyCode = 'EUR', LocalDate exchangeDate = getLocalDate(DATE_FORMAT)) {
        return new ExchangeInfo(currencyCode: currencyCode, exchangeDate: exchangeDate)
    }

    static ExchangeCurrencyRate anyExchangeCurrencyRate() {
        new ExchangeCurrencyRate(currencyCode: Currency.getInstance('EUR'),
                effectiveDate: LocalDate.now(),
                exchangeDate: LocalDate.now(),
                rate: new BigDecimal("1.2")
        )
    }

    static File anyFile() {
        return File.builder()
                .filePath('filePath')
                .userFilename('userFilename')
                .build()
    }

    static CurrencyRatesDto anyCurrencyRatesDto() {
        new CurrencyRatesDto(currencyCode: 'EUR', rates: [anyRatesDto()])
    }

    static RatesDto anyRatesDto() {
        new RatesDto(rate: new BigDecimal("1.2"), effectiveDate: getLocalDate(DATE_FORMAT))
    }

    static LocalDate getLocalDate(DateTimeFormatter formatter) {
        LocalDate.parse(LocalDate.now().format(formatter))
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
                .departureDate(getLocalDateTime(DATE_TIME_FORMAT))
                .arrivalDate(getLocalDateTimePlusYears(DATE_TIME_FORMAT, 1))
                .build()
    }

    static FlightDto anyFlightDto() {
        FlightDto.builder()
                .departurePlace('Warsaw')
                .arrivalPlace('Paris')
                .departureDate(getLocalDateTime(DATE_TIME_FORMAT))
                .arrivalDate(getLocalDateTimePlusYears(DATE_TIME_FORMAT, 1))
                .build()

    }

    static List<Flight> anyFlights() {
        List<Flight> flights = new ArrayList<Flight>()
        flights.add(anyFlight())
        flights.add(anyFlight())
        return flights
    }

    static Accommodation anyAccommodation() {
        return Accommodation.builder()
                .id(1)
                .hotelName("Gloria Hotel")
                .checkInDate(getLocalDateTime(DATE_TIME_FORMAT))
                .checkOutDate(getLocalDateTimePlusYears(DATE_TIME_FORMAT, 1))
                .build()
    }

    static AccommodationDto anyAccommodationDto() {
        AccommodationDto.builder()
                .hotelName("Gloria Hotel")
                .checkInDate(getLocalDateTime(DATE_TIME_FORMAT))
                .checkOutDate(getLocalDateTimePlusYears(DATE_TIME_FORMAT, 1))
                .build()
    }

    static List<Accommodation> anyAccommodations() {
        List<Accommodation> accommodations = new ArrayList<Accommodation>()
        accommodations.add(anyAccommodation())
        accommodations.add(anyAccommodation())
        return accommodations
    }
}
