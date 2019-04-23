## IDEMIA2019-29 DelegationReport

### 1. Diagram Sekwencji

@startuml DelegationReport
Client->DelegationService:downloadReport(Long delegationId)
DelegationService->DelegationRepository:getDelegationByDelegationId(Long delegationId)
database db
DelegationRepository->db:query
db-->DelegationRepository:entity
DelegationRepository-->DelegationService:Delegation delegation
DelegationService-->ExpenseRepository:getExpensesByDelegationId(Long delegationId)
database db
ExpenseRepository->db:query
db-->ExpenseRepository:entity
ExpenseRepository-->DelegationService:Iterable<Expense> expenses
DelegationService-->Client:ReportDto
@enduml

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Endpoint URL:** GET /delegations/{delegation_id}/report

- **delegation_id** jako **Long**

**Wymagane nagłówki:** Authorization

**Dostępny dla ról:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

#### Pozytywna odpowiedź:

**Status code:** 200

**Media type:** application/json

**Data:** ReportDto (informacje o delegacji (obiekt) + lista wydatków)

**Przykład odpowiedzi:**

```json
{
  "id": 1,
  "startDate": "2019-01-01T10:19:19",
  "endDate": "2019-02-01T10:19:19",
  "destinationCountryISO3": "BFA",
  "destinationLocation": "Radom",
  "delegationObjective": "Buy high quality rice",
  "status": "CREATED",
  "user": {
    "id": 1,
    "login": "amalysz",
    "firstName": "Adam",
    "lastName": "Małysz"
  },
  "expenses": [
    {
      "expenseId": 1,
      "expenseName": "Expense Name",
      "expenseValue": "1234.56",
      "expenseCurrency": "dzd",
      "files": [{ file }, { file }]
    },
    {
      "expenseId": 2,
      "expenseName": "Expense Name",
      "expenseValue": "1234.56",
      "expenseCurrency": "dzd",
      "files": [{ file }, { file }]
    }
  ]
}
```

#### Możliwe błędy:

- Status code `401` jeśli użytkownik jest niezalogowany
- Status code `403` jeśli użytkownik nie posiada uprawnień
- Status code `400` jeśli delegacja nie istnieje

#### Możliwe kody błędów (errorCode)

- w przypadku błędów 401, 403, 400 zwracany jest tylko status code
- entity-not-found - kiedy nie udało się odnaleźć delegacji

```json
{
  "errorCode": "entity-not-found"
}
```

### 3. Mockupy

## Web Report:

![Web](./mockups/web-expensesReport.png?raw=true "Web")

## Mobile Report:

![Mobile](./mockups/mobile-expensesReport.png?raw=true "Mobile")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                          | Warunki wstępne                                                         | Kroki wykonania                       | Oczekiwany rezultat                                             |
| --- | --------- | ---------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------- |
| 1   | E2E       | Pobieranie raportu.                            | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wchodzi na stronę raportu. | Wyświetla się raport delegacji.                                 |
| 2   | E2E       | Pobieranie nieistniejącego raportu.            | Użytkownik jest zalogowany w systemie                                   | Użytkownik wchodzi na stronę raportu. | Wyświetla się informacja o tym iż dany raport nie istnieje.     |
| 3   | E2E       | Pobieranie raportu bez odpowiednich uprawnień. | Użytkownik jest zalogowany w systemie                                   | Użytkownik wchodzi na stronę raportu. | Wyświetla się informacja o tym iż dany raport jest niedostępny. |
