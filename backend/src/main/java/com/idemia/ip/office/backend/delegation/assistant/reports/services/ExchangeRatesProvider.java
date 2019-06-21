package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DietReport;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.ExpenseReport;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ExchangeRatesProvider {

    Mono<Set<ExchangeCurrencyRate>> getExpensesExchangeRates(List<ExpenseReport> expenseReports);

    Mono<ExchangeCurrencyRate> getDiemExchange(DietReport diet);

    ExchangeCurrencyRate defaultExchangeRate(String currency, LocalDate exchangeDate);
}
