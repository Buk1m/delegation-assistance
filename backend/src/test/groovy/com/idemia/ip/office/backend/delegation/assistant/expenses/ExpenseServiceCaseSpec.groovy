package com.idemia.ip.office.backend.delegation.assistant.expenses

import com.idemia.ip.office.backend.delegation.assistant.entities.Expense
import com.idemia.ip.office.backend.delegation.assistant.expenses.repositories.ExpenseRepository
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpenseService
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpenseServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.files.services.FileService
import org.springframework.http.codec.multipart.FilePart
import reactor.core.publisher.Flux
import spock.lang.Specification

import static com.idemia.ip.office.backend.delegation.assistant.utils.DelegationTestUtils.anyExpense
import static com.idemia.ip.office.backend.delegation.assistant.utils.DelegationTestUtils.anyFile

class ExpenseServiceCaseSpec extends Specification {
    ExpenseRepository expenseRepository = Mock()
    FileService fileService = Mock()
    ExpenseService expenseService = new ExpenseServiceImpl(expenseRepository, fileService)

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
}
