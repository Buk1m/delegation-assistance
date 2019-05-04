package com.idemia.ip.office.backend.delegation.assistant.expenses.services;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface ExpensePageService {
    List<Sort.Order> getValidSortOrders(List<Sort.Order> sortCriteria);

    Pageable getPageable(Integer page, Integer size, List<Sort.Order> validOrders, String entityAlias);
}
