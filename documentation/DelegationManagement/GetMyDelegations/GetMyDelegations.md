## IDEMIA2019-2 GetMyDelegations

### 1. Diagram Sekwencji

@startuml getMyDelegations
"Client"->"DelegationService":getMyDelegations(LocalDateTime since, LocalDateTime until, DelegationStatus status)
alt filtering by date and status
"DelegationService"->DelegationRepository:getDelegationsByUserLogin(String userLogin, LocalDateTime since, LocalDateTime until, DelegationStatus status)
database DB
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else filtering by date
"DelegationService"->DelegationRepository:getDelegationsByUserLogin(String userLogin, LocalDateTime since, LocalDateTime until)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else flitering by status
"DelegationService"->DelegationRepository:getDelegationsByUserLogin(String userLogin, DelegationStatus status)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else flitering by status and since
"DelegationService"->DelegationRepository:getDelegationsByUserLogin(String userLogin, DelegationStatus status, LocalDateTime since)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else flitering by status and until
"DelegationService"->DelegationRepository:getDelegationsByUserLogin(String userLogin, DelegationStatus status, LocalDateTime until)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
else without filtering - all delegations
"DelegationService"->DelegationRepository:getDelegationsByUserLogin(String userLogin)
DelegationRepository->DB:query
DB-->DelegationRepository:result
DelegationRepository-->"DelegationService":Iterable<Delegation> delegations
end
"DelegationService"-->Client:Iterable<DelegationDTO> delegationDtos
@enduml

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Endpoint URL:** GET /delegations/my

**Wymagane nagłówki:** Authorization

**Dostępny dla ról:** EMPLOYEE

**Query:**

- **since** - data od kiedy poszukiwane są delegacje (względem `start_date`) **Domyślna wartość** null
- **until** - data do kiedy poszukiwane są delegacje (względem `start_date`) **Domyślna wartość** null
- **status** - status delegacji **Domyślna wartość** null

#### Pozytywna odpowiedź:

**Status code:** 200

**Media type:** application/json

**Data:** lista DelegationDTO

**Przykład odpowiedzi:**

```json
[
  {
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "destinationCountryISO3": "BFA",
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED"
  },
  {
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
- Status code `400` jeśli w zapytaniu występują nieporpawne parametry

### 3. Mockupy

#### Browser

![Browser mockup](./Mockups/Delegations_website.png?raw=true "Browser mockup")

#### Mobile

![Mobile mockup](./Mockups/Delegations_mobile.png?raw=true "Mobile mockup")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                                                                                                   | Warunki wstępne                                                         | Kroki wykonania                                                                                            | Oczekiwany rezultat                                |
| --- | --------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | E2E       | Wyświetlanie listy delegacji bez parametrów.                                                                            | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik klika przycisk "Pobierz delegacje".                                                             | Wyświetla się listę delegacji.                     |
| 2   | E2E       | Wyświetlanie listy delegacji z określonym statusem.                                                                     | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera "Status" delegacji i klika przycisk "Pobierz delegacje".                                | Wyświetla się listę delegacji.                     |
| 3   | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy.                                                               | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy" i klika przycisk "Pobierz delegacje".                                   | Wyświetla się listę delegacji.                     |
| 4   | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy.                                                               | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Do kiedy" i klika przycisk "Pobierz delegacje".                                   | Wyświetla się listę delegacji.                     |
| 5   | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy.                                                    | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy" oraz "Do kiedy" i klika przycisk "Pobierz delegacje".                   | Wyświetla się listę delegacji.                     |
| 6   | E2E       | Wyświetlanie listy delegacji z błędnie określonymi datami "od" i "do" kiedy (data "od" późniejsza niż "do").            | Użytkownik jest zalogowany.                                             | Użytkownik wybiera błędnie datę "Od kiedy" oraz "Do kiedy" i klika przycisk "Pobierz delegacje".           | Wyświetla się komunikat o błędnie podanych datach. |
| 7   | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy oraz statusem.                                                 | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy" oraz "Status" i klika przycisk "Pobierz delegacje".                     | Wyświetla się listę delegacji.                     |
| 8   | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy oraz statusem.                                                 | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Do kiedy" oraz "Status" i klika przycisk "Pobierz delegacje".                     | Wyświetla się listę delegacji.                     |
| 9   | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy oraz statusem.                                      | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację. | Użytkownik wybiera datę "Od kiedy", "Do kiedy" oraz "Status" i klika przycisk "Pobierz delegacje".         | Wyświetla się listę delegacji.                     |
| 10  | E2E       | Wyświetlanie listy delegacji z błędnie określonymi datami "od" i "do" kiedy i statusem (data "od" późniejsza niż "do"). | Użytkownik jest zalogowany w systemie.                                  | Użytkownik wybiera błędnie datę "Od kiedy", "Do kiedy" oraz "Status" i klika przycisk "Pobierz delegacje". | Wyświetla się komunikat o błędnie podanych datach. |
