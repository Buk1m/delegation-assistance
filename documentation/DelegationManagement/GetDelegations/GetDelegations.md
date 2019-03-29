## IDEMIA2019-2 GetMyDelegations

### 1. Diagram Sekwencji

@startuml getDelegations
"Client"->"DelegationService":getDelegations(String, userLogin, LocalDateTime since, LocalDateTime until, DelegationStatus status)
alt filtering by status
"DelegationService"->DelegationRepository:getDelegations(DelegationStatus status)
database DB
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else filtering by date
"DelegationService"->DelegationRepository:getDelegations(LocalDateTime since, LocalDateTime until)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else flitering by user
"DelegationService"->DelegationRepository:getDelegations(DelegationStatus status)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else flitering by all parameters
"DelegationService"->DelegationRepository:getDelegations(String userLogin, DelegationStatus status, LocalDateTime since, LocalDateTime until)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else without filtering - all delegations
"DelegationService"->DelegationRepository:getDelegations()
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
end
"DelegationService"-->Client:Iterable<DelegationDTO> delegationDtos
@enduml

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Endpoint URL:** GET /delegations

**Wymagane nagłówki:** Authorization

**Dostępny dla ról:** TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Query:**

- **login** - login właściciela delegacji **Domyślna wartość** null
- **since** - data od kiedy poszukiwane są delegacje (względem `start_date`) **Domyślna wartość** null
- **until** - data do kiedy poszukiwane są delegacje (względem `start_date`) **Domyślna wartość** null
- **status** - status delegacji **Domyślna wartość** null

#### Pozytywna odpowiedź:

**Status code:** 200

**Media type:** application/json

**Data:** lista DelegationDto

**Przykład odpowiedzi:**

```json
[
  {
    "id": 1,
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "destinationCountryISO3": "BFA",
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED"
  },
  {
    "id": 2,
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "destinationCountryISO3": "BFA",
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED"
  }
]
```

#### Możliwe błędy:

- Status code `401` jeśli użytkownik jest niezalogowany
- Status code `403` jeśli użytkownik nie posiada uprawnień
- Status code `400` jeśli w zapytaniu występują niepoprawne parametry

### 3. Mockupy

### Przeglądarka

![Browser mockup](mockups/allDelegationsWeb.PNG?raw=true "Browser")

##Systemy mobilne - filtrowanie
![MobileFiltering](mockups/allDelegationsMobile1.PNG?raw=true "Mobile")

##Systemy mobilne - lista delegacji
![Mobile](mockups/allDelegationsMobileList.PNG?raw=true "Mobile List")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                                                                                                                           | Warunki wstępne                                                         | Kroki wykonania                                                                                                                 | Oczekiwany rezultat                                |
| --- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | E2E       | Wyświetlanie listy delegacji bez parametrów.                                                                                                    | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik klika przycisk "Pobierz delegacje".                                                                                  | Wyświetla się listę delegacji.                     |
| 2   | E2E       | Wyświetlanie listy delegacji z określonym statusem.                                                                                             | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera "Status" delegacji i klika przycisk "Pobierz delegacje".                                                     | Wyświetla się listę delegacji.                     |
| 3   | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy.                                                                                       | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy" i klika przycisk "Pobierz delegacje".                                                        | Wyświetla się listę delegacji.                     |
| 4   | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy.                                                                                       | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Do kiedy" i klika przycisk "Pobierz delegacje".                                                        | Wyświetla się listę delegacji.                     |
| 5   | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy.                                                                            | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy" oraz "Do kiedy" i klika przycisk "Pobierz delegacje".                                        | Wyświetla się listę delegacji.                     |
| 6   | E2E       | Wyświetlanie listy delegacji z błędnie określonymi datami "od" i "do" kiedy (data "od" późniejsza niż "do").                                    | Użytkownik jest zalogowany.                                             | Użytkownik wybiera błędnie datę "Od kiedy" oraz "Do kiedy" i klika przycisk "Pobierz delegacje".                                | Wyświetla się komunikat o błędnie podanych datach. |
| 7   | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy oraz statusem.                                                                         | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy" oraz "Status" i klika przycisk "Pobierz delegacje".                                          | Wyświetla się listę delegacji.                     |
| 8   | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy oraz statusem.                                                                         | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Do kiedy" oraz "Status" i klika przycisk "Pobierz delegacje".                                          | Wyświetla się listę delegacji.                     |
| 9   | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy oraz statusem.                                                              | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy", "Do kiedy" oraz "Status" i klika przycisk "Pobierz delegacje".                              | Wyświetla się listę delegacji.                     |
| 10  | E2E       | Wyświetlanie listy delegacji z błędnie określonymi datami "od" i "do" kiedy i statusem (data "od" późniejsza niż "do").                         | Użytkownik jest zalogowany w systemie.                                  | Użytkownik wybiera błędnie datę "Od kiedy", "Do kiedy" oraz "Status" i klika przycisk "Pobierz delegacje".                      | Wyświetla się komunikat o błędnie podanych datach. |
| 11  | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy oraz loginem użytkownika.                                                              | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy" oraz "Login użytkownika" i klika przycisk "Pobierz delegacje".                               | Wyświetla się listę delegacji.                     |
| 12  | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy oraz loginem użytkownika.                                                              | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Do kiedy" oraz "Login użytkownika" i klika przycisk "Pobierz delegacje".                               | Wyświetla się listę delegacji.                     |
| 13  | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy oraz loginem użytkownika.                                                   | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy", "Do kiedy" oraz "Login użytkownika" i klika przycisk "Pobierz delegacje".                   | Wyświetla się listę delegacji.                     |
| 14  | E2E       | Wyświetlanie listy delegacji z błędnie określonymi datami "od" i "do" kiedy i loginem użytkownika (data "od" późniejsza niż "do").              | Użytkownik jest zalogowany.                                             | Użytkownik wybiera błędnie datę "Od kiedy", "Do kiedy" oraz "Login użytkownika" i klika przycisk "Pobierz delegacje".           | Wyświetla się komunikat o błędnie podanych datach. |
| 15  | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy, loginem użytkownika oraz statusem.                                                    | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy", "Login użytkownika" oraz "Status" i klika przycisk "Pobierz delegacje".                     | Wyświetla się listę delegacji.                     |
| 16  | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy, loginem użytkownika oraz statusem.                                                    | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Do kiedy", "Login użytkownika" oraz "Status" i klika przycisk "Pobierz delegacje".                     | Wyświetla się listę delegacji.                     |
| 17  | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy, loginem użytkownika oraz statusem.                                         | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy", "Do kiedy", "Login użytkownika" oraz "Status" i klika przycisk "Pobierz delegacje".         | Wyświetla się listę delegacji.                     |
| 18  | E2E       | Wyświetlanie listy delegacji z błędnie określonymi datami "od" i "do" kiedy, loginem użytkownika oraz statusem (data "od" późniejsza niż "do"). | Użytkownik jest zalogowany.                                             | Użytkownik wybiera błędnie datę "Od kiedy", "Do kiedy", "Login użytkownika" oraz "Status" i klika przycisk "Pobierz delegacje". | Wyświetla się komunikat o błędnie podanych datach. |
