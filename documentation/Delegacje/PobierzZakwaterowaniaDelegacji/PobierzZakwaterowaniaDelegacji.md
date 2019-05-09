## IDEMIA2019-215 PobierzZakwaterowaniaDelegacji

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/XP31IiKm44Nt-OeiTP4VwA8yyO48BaHtxYR99Oos6KscbYh-kyM2MeoyPNA6CtFleIeLdSR1tefdbBS7Uff9KMIcp7J4W4JXaStbmCZg-kr7MV8zoYi7TEzNq0-Re3_e8WGPHubVZtfs8pdP-4sluxdve_bjliEpL5OfIvUWfsKh8ayLDdhJihW--kvbGbbCzEwVJSZAogXjGolu_h169DTlhUqdZohL793Zsled)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/:delegationId/accommodations

**Query:** -

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** AccommodationDto

**Przykładowe dane:**

```json
[
  {
    "id": 1,
    "version": 0,
    "hotelsName": "Gloria Hotel",
    "checkInDate": "2019-01-01T10:00:00",
    "checkOutDate": "2019-05-12T10:00:00"
  },
  {
    "id": 2,
    "version": 0,
    "hotelsName": "Andora Hotel",
    "checkInDate": "2019-05-12T12:00:00",
    "checkOutDate": "2019-05-15T10:00:00"
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

| Lp. | Typ testu | Nazwa                                            | Warunki wstępne                                                                          | Kroki wykonania                                      | Oczekiwany rezultat                                          |
| --- | --------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 1   | E2E       | Pobieranie zakwaterowań delegacji                | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada delegację z zakwaterowaniami | 1. Użytkownik wchodzi na stronę z listą zakwaterowań | Wyświetla się lista zakwaterowań                             |
| 2   | E2E       | Pobieranie zakwaterowań nie swojej delegacji     | Użytkownik jest zalogowany w systemie                                                    | 1. Użytkownik wchodzi na stronę z listą zakwaterowań | Wyświetla się komunikat iż delegacja nie została odnaleziona |
| 3   | E2E       | Pobieranie zakwaterowań nieistniejącej delegacji | Użytkownik jest zalogowany w systemie                                                    | 1. Użytkownik wchodzi na stronę z listą zakwaterowań | Wyświetla się komunikat iż delegacja nie została odnaleziona |
