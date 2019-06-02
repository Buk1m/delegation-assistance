package com.idemia.ip.office.backend.delegation.assistant.reports.services;

import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeCurrencyRate;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.model.ExchangeInfo;
import com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.services.NBPConnectorService;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.DietReport;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.ExpenseReport;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ExchangeRatesProviderImpl implements ExchangeRatesProvider {

    private final NBPConnectorService nbpConnectorService;

    public ExchangeRatesProviderImpl(NBPConnectorService nbpConnectorService) {this.nbpConnectorService = nbpConnectorService;}

    @Override
    public Mono<Set<ExchangeCurrencyRate>> getExpensesExchangeRates(List<ExpenseReport> expenseReports) {
        return nbpConnectorService.getExchangeRatesForCurrencies(mapExpenseToExchangeInfo(expenseReports));
    }

    @Override
    public Mono<ExchangeCurrencyRate> getDiemExchange(DietReport diet) {
        ExchangeInfo exchangeInfo = new ExchangeInfo(diet.getCurrency(), yesterday());
        return nbpConnectorService.getExchangeRatesForCurrencies(Collections.singletonList(exchangeInfo))
                .map(set -> set.stream()
                        .findFirst()
                        .orElse(new ExchangeCurrencyRate(diet.getCurrency(), yesterday())));
    }

    private LocalDate yesterday() {
        return previousDay(LocalDate.now());
    }

    private LocalDate previousDay(LocalDate day) {
        return day.minusDays(1);
    }

    private List<ExchangeInfo> mapExpenseToExchangeInfo(List<ExpenseReport> expenseReports) {
        return expenseReports
                .stream()
                .filter(e -> e.getExchangeAmount() == null)
                .map(e -> new ExchangeInfo(e.getExpenseCurrency(), previousDay(e.getExpenseDate())))
                .collect(Collectors.toList());
    }
}
