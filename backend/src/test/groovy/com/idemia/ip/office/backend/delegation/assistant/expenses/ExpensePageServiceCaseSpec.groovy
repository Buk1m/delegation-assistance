package com.idemia.ip.office.backend.delegation.assistant.expenses

import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpensePageService
import com.idemia.ip.office.backend.delegation.assistant.expenses.services.ExpensePageServiceImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import spock.lang.Specification
import spock.lang.Unroll

import static org.springframework.data.domain.Sort.Direction.ASC
import static org.springframework.data.domain.Sort.Direction.DESC

class ExpensePageServiceCaseSpec extends Specification {
    ExpensePageService expensePageService = new ExpensePageServiceImpl()
    private static String idFieldName = 'id'
    private static String expenseDateFieldName = 'expenseDate'

    @Unroll
    def 'User get appropriate page'(int pageNo, int size, List<Sort.Order> sortOrders, List<Sort.Order> expectedSortOrders) {
        when: 'User wants page'
            Pageable page = expensePageService.getPageable(pageNo, size, sortOrders, 'e')

        then: 'Sort.Order in page match expected'
            page.pageNumber == pageNo
            page.pageSize == size
            page.getSort().size() == expectedSortOrders.size()
            page.getSort().get().allMatch { o -> expectedSortOrders.contains(o) }

        where: 'Parameters cases'
            pageNo | size | sortOrders                                                                        || expectedSortOrders
            1      | 1    | [new Sort.Order(ASC, idFieldName), new Sort.Order(ASC, expenseDateFieldName)] || [new Sort.Order(ASC, "e.${idFieldName}"), new Sort.Order(ASC, "e.${expenseDateFieldName}")]
            10     | 12   | [new Sort.Order(ASC, idFieldName), new Sort.Order(ASC, 'test')]               || [new Sort.Order(ASC, "e.${idFieldName}")]
            1      | 3    | []                                                                            || [new Sort.Order(DESC, "e.${idFieldName}")]
            2      | 8    | [new Sort.Order(DESC, 'test')]                                                || [new Sort.Order(DESC, "e.${idFieldName}")]
    }

    @Unroll
    def 'User get appropriate Sort.Orders'(List<Sort.Order> sortOrders, List<Sort.Order> expectedSortOrders) {
        when: 'User wants appropriate orders'
            List<Sort.Order> result = expensePageService.getValidSortOrders(sortOrders)

        then: 'User got appropriate Sort.Orders'
            result.size() == expectedSortOrders.size()
            result.stream().allMatch { o -> expectedSortOrders.contains(o) }

        where: 'Sort.Order parameters'
            sortOrders                                                          || expectedSortOrders
            [new Sort.Order(ASC, 'test')]                                   || [new Sort.Order(DESC, 'id')]
            []                                                              || [new Sort.Order(DESC, 'id')]
            [new Sort.Order(ASC, 'test'), new Sort.Order(ASC, 'id')]        || [new Sort.Order(ASC, 'id')]
            [new Sort.Order(ASC, 'expenseDate'), new Sort.Order(ASC, 'id')] || [new Sort.Order(ASC, 'expenseDate'), new Sort.Order(ASC, 'id')]
    }
}
