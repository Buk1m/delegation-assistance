package com.idemia.ip.office.backend.delegation.assistant.common


import org.springframework.data.domain.Sort
import spock.lang.Specification
import spock.lang.Unroll

class QueryParamParserCaseSpec extends Specification {

    @Unroll
    def 'Get Sort.Orders from query strings return appropriate list'(String sortQueryParam, List<Sort.Order> expectedSortOrders) {
        when: 'User wants to get list of Sort.Orders'
            List<Sort.Order> resultSortOrders = QueryParamParser.getSortOrders(sortQueryParam)

        then: 'Return orders match with expected'
            resultSortOrders.size() == expectedSortOrders.size()
            resultSortOrders.stream()
                    .allMatch { o ->
                expectedSortOrders.stream()
                        .anyMatch { expectedSortOrder ->
                    expectedSortOrder.direction == o.direction &&
                            expectedSortOrder.property == o.property &&
                            expectedSortOrder.ignoreCase == o.ignoreCase
                }
            }

        where: 'Parameters cases'
            sortQueryParam       || expectedSortOrders
            'sort.asc,test.desc' || [new Sort.Order(Sort.Direction.ASC, 'sort',).ignoreCase(), new Sort.Order(Sort.Direction.DESC, 'test').ignoreCase()]
            'sort.ASC,test.desc' || [new Sort.Order(Sort.Direction.ASC, 'sort',).ignoreCase(), new Sort.Order(Sort.Direction.DESC, 'test').ignoreCase()]
            'sort.aSc,test.DESC' || [new Sort.Order(Sort.Direction.ASC, 'sort',).ignoreCase(), new Sort.Order(Sort.Direction.DESC, 'test').ignoreCase()]
            't.blabla'           || []
            't.blabla.,test.asc' || [new Sort.Order(Sort.Direction.ASC, 'test').ignoreCase()]
            't.blabla.,test.asc' || [new Sort.Order(Sort.Direction.ASC, 'test').ignoreCase()]
            't.blabla.,test.asc' || [new Sort.Order(Sort.Direction.ASC, 'test').ignoreCase()]
            'test'               || []
    }
}
