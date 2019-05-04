package com.idemia.ip.office.backend.delegation.assistant.common

import com.idemia.ip.office.backend.delegation.assistant.entities.Expense
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto
import org.modelmapper.ModelMapper
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getListOfExpenses


class PageMapperCaseSpec extends Specification {
    PageMapper pageMapper = new PageMapper(new ModelMapper())

    def 'PageMapper return mapped PageDto'() {
        given: 'Page of elements'
            int totalElements = 15
            Page<Expense> expensesPage = new PageImpl<>(getListOfExpenses(10), Pageable.unpaged(), totalElements)

        when: 'PageMapper map Page to PageDto'
            PageDto<ExpenseDto> result = pageMapper.mapPageToDto(expensesPage, ExpenseDto.class)

        then: 'Then properties are mapped properly'
            result.totalSize == expensesPage.totalElements
            result.data.stream()
                    .allMatch { eDto ->
                expensesPage.get()
                        .anyMatch { e ->
                            e.expenseCurrency == eDto.expenseCurrency &&
                            e.expenseName == eDto.expenseName &&
                            e.expenseValue == eDto.expenseValue &&
                            e.expenseDate == eDto.expenseDate
                }
            }
    }
}
