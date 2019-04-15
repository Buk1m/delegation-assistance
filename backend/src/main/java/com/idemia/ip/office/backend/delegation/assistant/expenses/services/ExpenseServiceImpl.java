package com.idemia.ip.office.backend.delegation.assistant.expenses.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.expenses.repositories.ExpenseRepository;
import com.idemia.ip.office.backend.delegation.assistant.files.services.FileService;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final FileService fileService;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository,
            FileService fileService) {
        this.expenseRepository = expenseRepository;
        this.fileService = fileService;
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
}
