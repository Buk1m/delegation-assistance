# GenerateExpensesReport Docs

## Table of contents
- [GenerateExpensesReport Docs](#generateexpensesreport-docs)
  - [Table of contents](#table-of-contents)
  - [Sequence Diagram](#sequence-diagram)
  - [API](#api)
    - [Endpoint URL:](#endpoint-url)
    - [Request data:](#request-data)
    - [Response data:](#response-data)
  - [Page Mockups](#page-mockups)
    - [Web ExpensesReport:](#web-expensesreport)
  - [Mobile mockups](#mobile-mockups)
    - [Mobile ExpensesReport:](#mobile-expensesreport)
  - [Test Scenario:](#test-scenario)

<a name="sequence-diagram"></a>
## Sequence Diagram
@startuml
Client->ExpensesReportGenerator:generateExpenseReport()
ExpensesReportGenerator->ExpenseService:{Get} getExpenses()
ExpenseService->ExpenseRepository:getExpensesByDelegationId()
database db
ExpenseRepository->db:query
db-->ExpenseRepository:entities
ExpenseRepository-->ExpenseService:Expenses
ExpenseService-->ExpensesReportGenerator:ExpensesDTO
ExpensesReportGenerator-->ExpensesReportGenerator:generateReport()
ExpensesReportGenerator-->Client:ExpensesReport
@enduml

<a name="api"></a>
## API
<a name="endpoint-url"></a>
### Endpoint URL:
```
/delegations/:delegationId/expensesReport
```
<a name="request-data"></a>
### Request data:
```
Method: GET 
```
<a name="response-data"></a>
### Response data:
`ExpensesDTO`:
```json5
{ 
    [
        
        {
            "expenseName": "Expense Name 1",
            "expenseValue": "1234.56",
            "expenseCurrency": "eu",
            "receiptPhoto": {image}
        },
        {
            "expenseName": "Expense Name 2",
            "expenseValue": "420.0",
            "expenseCurrency": "dlr",
            "receiptPhoto": {image}
        },
        ...
    ]
}
```

<a name="page-mockups"></a>
## Page Mockups

### Web ExpensesReport:
![Form expensesReport mockup](./mockups/web-expensesReport.png?raw=true "ExpensesReport form")

<a name="mobile-mockups"></a>
## Mobile mockups

### Mobile ExpensesReport:
![Mobile expensesReport mockup](./mockups/mobile-expensesReport.png?raw=true "Mobile expensesReport form")

<a name="test-cases"></a>
## Test Scenario:

| Lp. | Test type | Name | Initial requirements | Execution steps | Expected outcome |
| --- | --- | --- | --- | --- | --- |
| 1. | unit | Generating expenses report | Delegation for expenses must exist | Click generate expenses report button  |  Displays expenses report as a list for selected delegation
| 2. | unit | Displaying empty expenses report | List of expenses is empty | Click generate expenses report button | Component displays message about list of expenses being empty
| 3. | unit | Number of expenses is correct | Length of list of expenses exists | Click generate expenses report button | Number of expenses displayed equals the actual size of expenses list length


`Based on:` [Przypadki testowe. Planowanie przebiegu testów.](https://bulldogjob.pl/articles/244-przypadki-testowe-planowanie-przebiegu-testow) 