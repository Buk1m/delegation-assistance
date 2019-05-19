package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.checklists.services.ChecklistTemplateService;
import com.idemia.ip.office.backend.delegation.assistant.countries.services.CountryService;
import com.idemia.ip.office.backend.delegation.assistant.entities.Checklist;
import com.idemia.ip.office.backend.delegation.assistant.entities.Country;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpenseService;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class ExternalResourceServiceImpl implements ExternalResourceService {

    private final ExpenseService expenseService;
    private final ChecklistTemplateService checklistTemplateService;
    private final CountryService countryService;
    private final ModelMapper modelMapper;

    public ExternalResourceServiceImpl(ExpenseService expenseService,
            ChecklistTemplateService checklistTemplateService,
            CountryService countryService, ModelMapper modelMapper) {
        this.expenseService = expenseService;
        this.checklistTemplateService = checklistTemplateService;
        this.countryService = countryService;
        this.modelMapper = modelMapper;
    }

    @Override
    public Mono<Checklist> getPreparedChecklist() {
        return checklistTemplateService.getChecklistTemplate()
                .map(checklistTemplate -> {
                    checklistTemplate.setId(null);
                    checklistTemplate.getActivities().forEach(activity -> activity.setId(null));
                    return checklistTemplate;
                }).map(preparedChecklistTemplate -> modelMapper.map(preparedChecklistTemplate, Checklist.class));
    }

    @Override
    public Mono<Country> getCountry(Long countryId) {
        return countryService.getCountry(countryId);
    }

    @Override
    public Mono<Expense> addExpense(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments) {
        return expenseService.addFiles(newExpense, userId, delegationId, attachments);
    }

    @Override
    public Mono<Page<Expense>> getExpenses(Delegation d,
            Integer pageNumber,
            Integer pageSize,
            List<Sort.Order> sortCriteria) {
        return expenseService.getExpenses(d, pageNumber, pageSize, sortCriteria);
    }

    @Override
    public Mono<UserFile> getFile(Long expenseId, Long fileId) {
        return expenseService.getFile(expenseId, fileId);
    }
}
