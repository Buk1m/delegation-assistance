package com.idemia.ip.office.backend.delegation.assistant.expenses.controllers;

import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto;
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.security.Principal;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
public class ExpenseController {
    private static final Logger LOG = LoggerFactory.getLogger(ExpenseController.class);

    private final ModelMapper modelMapper;
    private final DelegationService delegationService;
    private final UserService userService;

    public ExpenseController(ModelMapper modelMapper,
            DelegationService delegationService,
            UserService userService) {
        this.modelMapper = modelMapper;
        this.delegationService = delegationService;
        this.userService = userService;
    }

    @PostMapping(value = "/delegations/{delegationId}/expenses",
            consumes = MULTIPART_FORM_DATA_VALUE,
            produces = APPLICATION_JSON_VALUE)
    public Mono<Void> addExpense(ExpenseDto expenseDto,
            @PathVariable Long delegationId,
            Principal principal) {
        LOG.info("User: {} adds expenses: {}", principal.getName(), expenseDto);
        Expense newExpense = modelMapper.map(expenseDto, Expense.class);

        return userService.getUser(principal.getName())
            .flatMap(u -> delegationService.addExpense(newExpense, u.getId(), delegationId, expenseDto.getAttachments()));
    }
}
