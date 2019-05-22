## IDEMIA2019-214 PobierzLotyDelegacji

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/TP31oi8m48JlUOeS__-G5-YX52oAq8Fe4oJD45TYeibMgEAxAxIeOBpExdoxCqrcdNWuUhc9Xf2kNUInXOVJ_O74mXC2gtfIc6BO8LseHtLRWU_IWT-ZfIUtvxyk1YVjIrtRV_5b_oHkSOgPEAQnSk09aaiKgraRdI6j4IMxggsfpWFIAAnHFquWC34XbmcbfFD7XH2gdlgPLrgEMJG8zbcdU000)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/:delegationId/flights

**Query:** -

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** Lista FlightDto

**Przykładowe dane:**

```json
[
  {
    "id": 1,
    "version": 1,
    "departurePlace": "Warsaw",
    "arrivalPlace": "Paris",
    "departureDate": "2019-01-01T10:00:00",
    "arrivalDate": "2019-01-01T12:00:00"
  },
  {
    "id": 2,
    "version": 1,
    "departurePlace": "Paris",
    "arrivalPlace": "Warsaw",
    "departureDate": "2019-01-02T10:00:00",
    "arrivalDate": "2019-01-02T12:00:00"
  }
]
```

#### Dodatkowe informacje

-

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli użytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- delegation-not-found - jeśli delegacja nie istnieje

### 3. Mockupy

![Browser mockup](./mockupy/Web.png?raw=true "Browser mockup")

![Mobile mockup](./mockupy/Mobile.png?raw=true "Mobile mockup")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                     | Warunki wstępne                                                                | Kroki wykonania                               | Oczekiwany rezultat                                          |
| --- | --------- | ----------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------ |
| 1   | E2E       | Pobieranie lotów delegacji                | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada delegację z lotami | 1. Użytkownik wchodzi na stronę z listą lotów | Wyświetla się lista lotów                                    |
| 2   | E2E       | Pobieranie lotów nie swojej delegacji     | Użytkownik jest zalogowany w systemie                                          | 1. Użytkownik wchodzi na stronę z listą lotów | Wyświetla się komunikat iż delegacja nie została odnaleziona |
| 3   | E2E       | Pobieranie lotów nieistniejącej delegacji | Użytkownik jest zalogowany w systemie                                          | 1. Użytkownik wchodzi na stronę z listą lotów | Wyświetla się komunikat iż delegacja nie została odnaleziona |
