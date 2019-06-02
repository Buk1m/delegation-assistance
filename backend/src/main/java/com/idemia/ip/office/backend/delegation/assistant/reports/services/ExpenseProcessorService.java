package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.reports.model.ExpenseReport;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ExpenseProcessorService {

    Mono<List<ExpenseReport>> processExpenses(List<ExpenseReport> expenseReports);
}
