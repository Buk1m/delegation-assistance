package com.idemia.ip.office.backend.delegation.assistant.common;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public final class QueryParamParser {
    private final static Map<String, Sort.Direction> SORT = Stream.of(
            new AbstractMap.SimpleEntry<>("desc", Sort.Direction.DESC),
            new AbstractMap.SimpleEntry<>("asc", Sort.Direction.ASC)
    ).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    public static List<Sort.Order> getSortOrders(String sortQueryParam) {
        return Stream.of(StringUtils.split(sortQueryParam, ','))
                .map(String::toLowerCase)
                .map(QueryParamParser::getSortOrder)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    private static Optional<Sort.Order> getSortOrder(String s) {
        String[] orderSubString = StringUtils.split(s, '.');
        if (orderSubString.length != 2 || !SORT.containsKey(orderSubString[1])) {
            return Optional.empty();
        }

        return Optional.of(new Sort.Order(SORT.get(orderSubString[1]), orderSubString[0]).ignoreCase());
    }
}
