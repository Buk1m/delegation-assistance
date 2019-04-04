## IDEMIA2019-2 GetMyDelegations

### 1. Diagram Sekwencji

@startuml downloadReport
"Client"->"DelegationService":downloadReport(ReportType reportType, Long delegationId)
"DelegationService"->DelegationRepository:getDelegation(Long delegationId)
database DB
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Delegation delegation
"DelegationService"->DelegationRepository:getDelegationExpenses(Long delegationId)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Expense> expenses
"DelegationService"->DelegationService:generateReportFile(Delegation delegation, Iterable<Expense> expenses, ReportType type)
"DelegationService"-->Client:File report
@enduml

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Endpoint URL:** GET /delegations/{delegation_id}/report

- **delegation_id** jako **Long**

**Wymagane nagłówki:** Authorization

**Dostępny dla ról:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagania:** Delegacja musi mieć status **RATIFIED** oraz zostać zrealizowana

**Query:**

- **reportType** - enum (CSV, XLSX, PDF) **domyślna wartość:** PDF

#### Pozytywna odpowiedź:

**Status code:** 200

**Media type:** application/pdf _lub_ text/csv _lub_ application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

**Data:** plik raportu

#### Możliwe błędy:

- Status code `401` jeśli użytkownik jest niezalogowany
- Status code `403` jeśli użytkownik nie posiada uprawnień
- Status code `400` jeśli w zapytaniu występują niepoprawne parametry (nieodpowiedni format)
- Status code `405` jeśli delegacja nie została jeszcze zrealizowana lub posiada nieodpowiedni status

#### Możliwe kody błędów (errorCode)
- w przypadku błędów 401, 403, 400 zwracany jest tylko status code
- wrong-delegation-status - kiedy delegacja posiada nieodpowiedni status
- delegation-did-not-finished - kiedy delegacje się jeszcze nie skończyła

```json
"errorCode": "wrong-delegation-status"
```

```json
"errorCode": "delegation-did-not-finished"
```

### 3. Mockupy

## Plik CSV

![Browser mockup](mockups/csv.png?raw=true "CSV")

## Plik XLSX

![MobileFiltering](mockups/xlsx.png?raw=true "XLSX")

## Plik PDF

![Mobile](mockups/pdf.png?raw=true "PDF")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                                   | Warunki wstępne                                                                                         | Kroki wykonania                                                           | Oczekiwany rezultat                                                          |
| --- | --------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | E2E       | Pobranie pliku raportu CSV.                             | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację gotową do wygenerowania raportu. | Użytkownik wybiera typ pliku "CSV" oraz klika przycisk "Pobierz raport".  | Raport w formacie CSV zostaje pobrany.                                       |
| 2   | E2E       | Pobranie pliku raportu PDF.                             | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację gotową do wygenerowania raportu. | Użytkownik wybiera typ pliku "PDF" oraz klika przycisk "Pobierz raport".  | Raport w formacie PDF zostaje pobrany.                                       |
| 3   | E2E       | Pobranie pliku raportu XLSX.                            | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację gotową do wygenerowania raportu. | Użytkownik wybiera typ pliku "XLSX" oraz klika przycisk "Pobierz raport". | Raport w formacie XLSX zostaje pobrany.                                      |
| 4   | E2E       | Pobranie pliku raportu przez użytkownika bez uprawnień. | Użytkownik jest zalogowany w systemie.                                                                  | Użytkownik wybiera typ pliku oraz klika przycisk "Pobierz raport".        | Wyświetla się komunikat o braku uprawnień.                                   |
| 5   | E2E       | Pobranie pliku reportu przed realizacją delegacji.      | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację.                                 | Użytkownik wybiera typ pliku oraz klika przycisk "Pobierz raport".        | Wyświetla się komunikat o tym że delegacja nie została jeszcze zrealizowana. |
| 6   | E2E       | Pobranie pliku reportu z błędnym statusem.              | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację.                                 | Użytkownik wybiera typ pliku oraz klika przycisk "Pobierz raport".        | Wyświetla się komunikat o tym że delegacja nie została zrealizowana.         |
