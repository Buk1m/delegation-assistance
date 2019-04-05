package com.idemia.ip.office.backend.delegation.assistant.expenses

import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense
import com.idemia.ip.office.backend.delegation.assistant.expenses.controllers.ExpenseController
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto
import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService
import org.modelmapper.ModelMapper
import org.springframework.http.codec.multipart.FilePart
import reactor.core.publisher.Mono
import spock.lang.Specification

import java.security.Principal

import static com.idemia.ip.office.backend.delegation.assistant.utils.DelegationTestUtils.anyExpenseDto
import static com.idemia.ip.office.backend.delegation.assistant.utils.DelegationTestUtils.getUser

class ExpenseControllerCaseSpec extends Specification {
    ModelMapper modelMapper = new ModelMapper()
    DelegationService delegationService = Mock()
    UserService userService = Mock()
    String login = 'login'
    ExpenseController expenseController = new ExpenseController(modelMapper, delegationService, userService)

    def 'User creates expense with files'() {
        given: 'User is adding expenses with files'
            ExpenseDto expenseDto = anyExpenseDto()
            expenseDto.attachments = []
            Principal principal = new AuthenticationImpl('', '', login, [])

        when: 'User is adding expenses'
            expenseController.addExpense(expenseDto, 1, principal).block()

        then: 'Expense is added to delegation'
            1 * userService.getUser(login) >> Mono.just(getUser(1))
            1 * delegationService.addExpense(_ as Expense, _ as Long, _ as Long, _ as List<FilePart>) >>
                    { Expense expense, Long userId, Long delId, List<FilePart> files ->
                        expense.expenseValue == expenseDto.expenseValue
                        expense.expenseName == expenseDto.expenseName
                        expense.expenseCurrency == expenseDto.expenseCurrency
                        Mono.just(Void)
                    }
    }
}
