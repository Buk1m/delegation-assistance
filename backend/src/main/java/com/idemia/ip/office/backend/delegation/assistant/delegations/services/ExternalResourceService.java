package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Country;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ExternalResourceService {
    Mono<Checklist> getPreparedChecklist();

    Mono<Country> getCountry(Long countryId);

    Mono<Expense> addExpense(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments);

    Mono<Page<Expense>> getExpenses(Delegation delegation,
            Integer pageNumber,
            Integer pageSize,
            List<Sort.Order> sortCriteria);

    Mono<UserFile> getFile(Long expenseId, Long fileId);
}
