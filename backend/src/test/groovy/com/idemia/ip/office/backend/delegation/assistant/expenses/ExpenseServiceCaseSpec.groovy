package com.idemia.ip.office.backend.delegation.assistant.expenses

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense
import com.idemia.ip.office.backend.delegation.assistant.expenses.configuration.ExpenseExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.expenses.repositories.ExpenseRepository
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpensePageService
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpenseService
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpenseServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.files.services.FileService
import org.springframework.data.domain.*
import org.springframework.http.codec.multipart.FilePart
import reactor.core.publisher.Flux
import spock.lang.Specification
import spock.lang.Unroll

import java.util.stream.Collectors

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyDelegation
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyExpense
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyFile
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anySortOrder

class ExpenseServiceCaseSpec extends Specification {
    ExpenseRepository expenseRepository = Mock()
    FileService fileService = Mock()
    ExpenseExceptionProperties expenseExceptionProperties = Mock()
    ExpensePageService expensePageService = Mock()
    ExpenseService expenseService = new ExpenseServiceImpl(expenseRepository, fileService, expenseExceptionProperties, expensePageService)

    def 'Adding files to expense'() {
        given: 'Expense with files'
            Expense expense = anyExpense()
            expense.files = []
            FilePart file1 = Mock()
            FilePart file2 = Mock()
            Long userId = 1
            Long delegationId = 1

        when: 'Files are being saved for expense'
            expenseService.addFiles(expense, userId, delegationId, [file1, file2]).block()

        then: 'Files are properly attached to expense and saved'
            1 * fileService.addFiles(_ as List<FilePart>, userId, delegationId) >> Flux.fromIterable([anyFile(), anyFile()])
            1 * expenseRepository.save(expense) >> {
                expense.files.size() == 2
                expense
            }
    }

    @Unroll
    def 'Page is correctly created'(Integer numOfExistingExpenses, Integer page, Integer size, List<Sort.Order> sortOrders, Integer returnedElements) {
        given: 'Existing expenses'
            int id = 0
            List<Expense> pagedExpenses = getExpenses(page, size, numOfExistingExpenses)
            List<Long> ids = pagedExpenses.stream().map { e -> ++id }.collect(Collectors.toList())

            1 * expenseRepository.findIdsBy(_ as Delegation, _ as Pageable) >> { Delegation del, Pageable p ->
                p.pageSize == size
                p.pageNumber == page
                new PageImpl<>(ids, Pageable.unpaged(), numOfExistingExpenses)
            }

            1 * expensePageService.getPageable(page, size, sortOrders, _ as String) >> {
                Sort sort = new Sort(sortOrders)
                PageRequest.of(page, size, sort)
            }

            1 * expensePageService.getValidSortOrders(sortOrders) >> {
                sortOrders
            }

            1 * expenseRepository.getExpensesWithFilesById(_ as List<Long>, _ as Sort) >> pagedExpenses

        when: 'Getting paged Expenses'
            Page<Expense> result = expenseService.getExpenses(anyDelegation(), page, size, sortOrders).block()

        then: 'Service returns correct page'
            result.getContent().size() == pagedExpenses.size()
            result.getContent().size() == returnedElements
            result.totalElements == numOfExistingExpenses

        where: 'Parameters cases'
            numOfExistingExpenses | page | size | sortOrders       || returnedElements
            12                    | 2    | 2    | [anySortOrder()] || 2
            3                     | 12   | 2    | [anySortOrder()] || 0
            22                    | 0    | 8    | [anySortOrder()] || 8
            2                     | 0    | 8    | [anySortOrder()] || 2
    }

    List<Expense> getExpenses(int page, int size, int numOfExistingExpenses) {
        int offset = page * size
        return (offset..(offset + size - 1)).findAll { it < numOfExistingExpenses }.collect { anyExpense() }
    }
}
