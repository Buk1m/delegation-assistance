package com.idemia.ip.office.backend.delegation.assistant.expenses.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ExpenseService {
    Mono<Expense> addFiles(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments);
}
