package com.idemia.ip.office.backend.delegation.assistant.expenses

import com.idemia.ip.office.backend.delegation.assistant.common.PageDto
import com.idemia.ip.office.backend.delegation.assistant.common.PageMapper
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense
import com.idemia.ip.office.backend.delegation.assistant.expenses.controllers.ExpenseController
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto

import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService
import org.modelmapper.ModelMapper
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.ResponseEntity
import org.springframework.http.codec.multipart.FilePart
import org.springframework.security.core.Authentication
import reactor.core.publisher.Mono
import spock.lang.Specification

import java.security.Principal

import static com.idemia.ip.office.backend.delegation.assistant.configuration.ModelMapperConfiguration.getModelMapperPropertyConditionNotNull
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyExpenseDto
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getListOfExpenses
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getUser
import static org.springframework.http.HttpStatus.OK

class ExpenseControllerCaseSpec extends Specification {
    Authentication authentication = Mock()
    ModelMapper modelMapper = new ModelMapper()
    DelegationService delegationService = Mock()
    UserService userService = Mock()
    String login = 'login'
    ExpenseController expenseController = new ExpenseController(modelMapper, getModelMapperPropertyConditionNotNull(), delegationService, userService, new PageMapper(modelMapper))

    def 'User creates expense with files'() {
        given: 'User is adding expenses with files'
            ExpenseDto expenseDto = anyExpenseDto()
            expenseDto.attachments = []

        when: 'User is adding expenses'
            ResponseEntity<ExpenseDto> response = expenseController.addExpense(expenseDto, 1, authentication).block()

        then: 'Expense is added to delegation'
            response.statusCode == OK
            authentication.getName() >> login
            1 * userService.getUser(login) >> Mono.just(getUser(1))
            1 * delegationService.addExpense(_ as Expense, _ as Long, _ as Long, _ as List<FilePart>, _ as Authentication) >>
                    { Expense expense, Long userId, Long delId, List<FilePart> files, Authentication authentication ->
                        expense.expenseValue == expenseDto.expenseValue
                        expense.expenseName == expenseDto.expenseName
                        expense.expenseCurrency == expenseDto.expenseCurrency
                        Mono.just(expense)
                    }
    }

    def 'User retrieves requested expenses'() {
        given: 'Request params'
            int page = 0
            int size = 10
            String sort = 'expenseName.asc'
            Long delegationId = 1

        when: 'User request for expenses'
            ResponseEntity<PageDto<ExpenseDto>> response = expenseController.getExpenses(delegationId, page, size, sort, new AuthenticationImpl('')).block()

        then: 'Expenses are returned'
            1 * delegationService.getExpenses(delegationId, page, size, _ as List<Sort.Order>, _ as Authentication) >>
                    Mono.just(new PageImpl<>(getListOfExpenses(size), Pageable.unpaged(), size))

            response.statusCode.value() == 200
            response.body.totalSize == size as Long
    }
}
