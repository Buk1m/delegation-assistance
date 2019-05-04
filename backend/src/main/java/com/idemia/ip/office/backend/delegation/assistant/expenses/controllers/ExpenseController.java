package com.idemia.ip.office.backend.delegation.assistant.expenses.controllers;

import com.idemia.ip.office.backend.delegation.assistant.common.PageDto;
import com.idemia.ip.office.backend.delegation.assistant.common.PageMapper;
import com.idemia.ip.office.backend.delegation.assistant.common.QueryParamParser;
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto;
import com.idemia.ip.office.backend.delegation.assistant.users.services.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
public class ExpenseController {
    private static final Logger LOG = LoggerFactory.getLogger(ExpenseController.class);

    private final ModelMapper modelMapper;
    private final ModelMapper modelMapperSkipNulls;
    private final DelegationService delegationService;
    private final UserService userService;
    private final PageMapper pageMapper;

    public ExpenseController(ModelMapper modelMapper,
            @Qualifier("notNullProperty") ModelMapper modelMapperSkipNulls,
            DelegationService delegationService,
            UserService userService,
            PageMapper pageMapper) {
        this.modelMapper = modelMapper;
        this.modelMapperSkipNulls = modelMapperSkipNulls;
        this.delegationService = delegationService;
        this.userService = userService;
        this.pageMapper = pageMapper;
    }

    @PostMapping(value = "/delegations/{delegationId}/expenses",
            consumes = MULTIPART_FORM_DATA_VALUE,
            produces = APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ExpenseDto>> addExpense(@Valid ExpenseDto expenseDto,
            @PathVariable Long delegationId,
            Principal principal) {
        LOG.info("User: {} adds expenses: {}", principal.getName(), expenseDto);
        Expense newExpense = modelMapperSkipNulls.map(expenseDto, Expense.class);

        return userService.getUser(principal.getName())
                .flatMap(u -> delegationService.addExpense(newExpense,
                        u.getId(),
                        delegationId,
                        expenseDto.getAttachments()))
                .map(e -> modelMapper.map(e, ExpenseDto.class))
                .map(ResponseEntity::ok);
    }

    @GetMapping(value = "/delegations/{delegationId}/expenses")
    public Mono<ResponseEntity<PageDto<ExpenseDto>>> getExpenses(@PathVariable Long delegationId,
            @RequestParam(value = "page", defaultValue = "0") Integer pageNumber,
            @RequestParam(value = "size", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sort", defaultValue = "id.desc", required = false) String sort,
            Authentication authentication) {
        List<Sort.Order> sortingOrders = QueryParamParser.getSortOrders(sort);
        return delegationService.getExpenses(delegationId, pageNumber, pageSize, sortingOrders, authentication)
                .map(p -> pageMapper.mapPageToDto(p, ExpenseDto.class))
                .map(ResponseEntity::ok);
    }
}
