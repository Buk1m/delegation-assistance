package com.idemia.ip.office.backend.delegation.assistant.expenses.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import com.idemia.ip.office.backend.delegation.assistant.expenses.configuration.ExpenseExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.expenses.repositories.ExpenseRepository;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import com.idemia.ip.office.backend.delegation.assistant.files.services.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    private static final Logger LOG = LoggerFactory.getLogger(ExpenseServiceImpl.class);

    private final ExpenseRepository expenseRepository;
    private final FileService fileService;
    private final ExpenseExceptionProperties expenseExceptionProperties;
    private final ExpensePageService expensePageService;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository,
            FileService fileService,
            ExpenseExceptionProperties expenseExceptionProperties,
            ExpensePageService expensePageService) {
        this.expenseRepository = expenseRepository;
        this.fileService = fileService;
        this.expenseExceptionProperties = expenseExceptionProperties;
        this.expensePageService = expensePageService;
    }

    @Override
    public Mono<Expense> addFiles(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments) {
        return fileService.addFiles(attachments, userId, delegationId)
                .collectList()
                .map(fs -> {
                    newExpense.getFiles().addAll(fs);
                    return newExpense;
                })
                .map(expenseRepository::save);
    }

    @Override
    public Mono<Page<Expense>> getExpenses(Delegation d,
            Integer pageNumber,
            Integer pageSize,
            List<Sort.Order> sortCriteria) {
        List<Sort.Order> validSortOrders = expensePageService.getValidSortOrders(sortCriteria);
        Pageable pageable = expensePageService.getPageable(pageNumber, pageSize, validSortOrders, "e");
        return Mono.fromCallable(() -> expenseRepository.findIdsBy(d, pageable))
                .flatMap(p -> getPageExpensesBy(p, Sort.by(validSortOrders)));
    }

    @Override
    public Mono<UserFile> getFile(Long expenseId, Long fileId) {
        return Mono.fromCallable(() -> expenseRepository.findById(expenseId))
                .map(e -> e.orElseThrow(() -> delegationNotFoundException(expenseId)))
                .flatMap(e -> fileService.getFile(fileId));
    }

    private Mono<Page<Expense>> getPageExpensesBy(Page<Long> idsPage, Sort sort) {
        List<Long> ids = idsPage.getContent();
        return Mono.fromCallable(() -> expenseRepository.getExpensesWithFilesById(ids, sort))
                .map(expenses -> new PageImpl<>(expenses, Pageable.unpaged(), idsPage.getTotalElements()));
    }

    private EntityNotFoundException delegationNotFoundException(Long id) {
        LOG.info("Expense with id {} hasn't been found.", id);
        return new EntityNotFoundException(
                "Expense not found.",
                expenseExceptionProperties.getExpenseNotFound(),
                Expense.class
        );
    }
}
