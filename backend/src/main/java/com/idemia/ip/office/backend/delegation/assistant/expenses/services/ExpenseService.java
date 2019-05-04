package com.idemia.ip.office.backend.delegation.assistant.expenses.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ExpenseService {
    Mono<Expense> addFiles(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments);

    Mono<Page<Expense>> getExpenses(Delegation d,
            Integer pageNumber,
            Integer pageSize,
            List<Sort.Order> sortCriteria);

    Mono<UserFile> getFile(Long expenseId, Long fileId);
}
