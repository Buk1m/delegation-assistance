package com.idemia.ip.office.backend.delegation.assistant.common


import org.springframework.data.domain.Sort
import spock.lang.Specification
import spock.lang.Unroll

class QueryParamParserCaseSpec extends Specification {

    @Unroll
    def 'Get Sort.Orders #sortQueryParam from query strings return appropriate list'(String sortQueryParam, List<Sort.Order> expectedSortOrders) {
        when: 'User wants to get list of Sort.Orders'
            List<Sort.Order> resultSortOrders = QueryParamParser.getSortOrders(sortQueryParam)

        then: 'Return orders match with expected'
            resultSortOrders.size() == expectedSortOrders.size()
            resultSortOrders.stream()
                    .allMatch { o ->
                expectedSortOrders.stream()
                        .anyMatch { expectedSortOrder ->
                    expectedSortOrder.property == o.property &&
                            expectedSortOrder.direction == o.direction
                }
            }

        where: 'Parameters cases'
            sortQueryParam                  || expectedSortOrders
            'sort.asc,test.desc'            || [new Sort.Order(Sort.Direction.ASC, 'sort',), new Sort.Order(Sort.Direction.DESC, 'test')]
            'sort.ASC,test.desc'            || [new Sort.Order(Sort.Direction.ASC, 'sort',), new Sort.Order(Sort.Direction.DESC, 'test')]
            'sort.ASC,test.desc, test2.asc' || [new Sort.Order(Sort.Direction.ASC, 'sort',), new Sort.Order(Sort.Direction.DESC, 'test'), new Sort.Order(Sort.Direction.ASC, 'test2')]
            'sort.aSc,test.DESC'            || [new Sort.Order(Sort.Direction.ASC, 'sort',), new Sort.Order(Sort.Direction.DESC, 'test')]
            'sort.aSc,, , test.DESC'        || [new Sort.Order(Sort.Direction.ASC, 'sort',), new Sort.Order(Sort.Direction.DESC, 'test')]
            't.blabla'                      || []
            ',,,'                           || []
            null                            || []
            't.blabla.,test.asc'            || [new Sort.Order(Sort.Direction.ASC, 'test')]
            'test'                          || []
    }
}
