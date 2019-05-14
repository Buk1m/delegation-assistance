package com.idemia.ip.office.backend.delegation.assistant.expenses.services;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpensePageServiceImpl implements ExpensePageService {
    private static final List<String> AVAILABLE_SORT_FIELDS = Arrays.asList(
            "id",
            "expenseDate"
    );

    private static final List<Sort.Order> DEFAULT_SORT_ORDER = Arrays.asList(new Sort.Order(Sort.Direction.DESC,
            AVAILABLE_SORT_FIELDS.get(0)));

    @Override
    public Pageable getPageable(Integer pageNo, Integer pageSize, List<Sort.Order> sortCriteria, String entityAlias) {
        List<Sort.Order> validSortOrders = getValidSortOrders(sortCriteria);
        Sort sort = Sort.by(mapSortOrders(validSortOrders, entityAlias));
        return PageRequest.of(pageNo, pageSize, sort);
    }

    @Override
    public List<Sort.Order> getValidSortOrders(List<Sort.Order> sortCriteria) {
        List<Sort.Order> userSortOrders = sortCriteria.stream()
                .filter(o -> AVAILABLE_SORT_FIELDS.contains(o.getProperty()))
                .collect(Collectors.toList());

        return userSortOrders.isEmpty() ? DEFAULT_SORT_ORDER : userSortOrders;
    }

    private List<Sort.Order> mapSortOrders(List<Sort.Order> validOrders, String entityAlias) {
        return validOrders.stream()
                .map(o -> new Sort.Order(o.getDirection(), entityAlias + "." + o.getProperty()))
                .collect(Collectors.toList());
    }
}
