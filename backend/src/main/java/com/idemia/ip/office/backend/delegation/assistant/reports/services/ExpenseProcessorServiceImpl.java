package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.ExpenseReport;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import static com.idemia.ip.office.backend.delegation.assistant.common.FinanceArithmeticStandards.exchange;
import static com.idemia.ip.office.backend.delegation.assistant.reports.services.ReportService.TARGET_CURRENCY;

@Service
public class ExpenseProcessorServiceImpl implements ExpenseProcessorService {

    private final ExchangeRatesProvider exchangeRatesProvider;

    public ExpenseProcessorServiceImpl(ExchangeRatesProvider exchangeRatesProvider) {this.exchangeRatesProvider = exchangeRatesProvider;}

    @Override
    public Mono<List<ExpenseReport>> processExpenses(List<ExpenseReport> expenseReports) {
        return exchangeRatesProvider.getExpensesExchangeRates(expenseReports)
                .map(set -> processRates(set, expenseReports));
    }

    private List<ExpenseReport> processRates(Set<ExchangeCurrencyRate> set, List<ExpenseReport> expenseReports) {
        for (ExpenseReport expenseReport : expenseReports) {
            ExchangeCurrencyRate exchangeCurrencyRate = getProperExchange(set, expenseReport);
            expenseReport.setTargetCurrency(TARGET_CURRENCY);
            expenseReport.setExchangeRate(exchangeCurrencyRate.getRate());
            BigDecimal exchangeAmount = exchange(expenseReport.getExpenseValue(), exchangeCurrencyRate.getRate());
            expenseReport.setExchangeAmount(exchangeAmount);
        }
        return expenseReports;
    }

    private ExchangeCurrencyRate getProperExchange(Set<ExchangeCurrencyRate> set, ExpenseReport expenseReport) {
        return set.stream()
                .filter(e -> e.getExchangeDate().equals(previousDay(expenseReport.getExpenseDate())))
                .filter(e -> e.getCurrencyCode().equals(expenseReport.getExpenseCurrency()))
                .findFirst()
                .orElseThrow();
    }

    private LocalDate previousDay(LocalDate date) {
        return date.minusDays(1);
    }
}
