## IDEMIA2019-207 DodajLotDoDelegacji

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/TP71IaGX58RtFeNBWl45N5m6iY2uYsYUGEUSx0oEPz8pmILwzmHhRf6pKL7v_j_FRHLVv7nCsZ7umypYs672wFS7KdU9C8kP-euGvnsMTzgZ_NZYAf_wrCRry25HV9MRFZbX_VApskYPSzHmkVe8j-eVzNVGCpOs2PV5Ue0_v6_iPYU5LYZ2_V6KU46SEL8U9e8N7tn53K6Deim4mRwTiImAWhbIfnaX8QnZmaXMhpruhvcwONjHfhQOeNs7-W80)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** EMPLOYEE

**Wymagane nagłówki:** Authorization

**Endpoint URL:** POST /delegations/:delegationId/flights

**Query:** -

**Typ nośnika:** application/json

**Typ danych:** FlightDto

**Przykładowe dane:**

```json
{
  "departurePlace": "Warsaw",
  "arrivalPlace": "Paris",
  "departureDate": "2019-01-01T10:00:00",
  "arrivalDate": "2019-01-01T12:00:00"
}
```

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** FlightDto

**Przykładowe dane:**

```json
{
  "id": 1,
  "version": 0,
  "departurePlace": "Warsaw",
  "arrivalPlace": "Paris",
  "departureDate": "2019-01-01T10:00:00",
  "arrivalDate": "2019-01-01T12:00:00"
}
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

| Lp. | Typ testu | Nazwa                                            | Warunki wstępne                                                       | Kroki wykonania                                                                                                                                                                                                   | Oczekiwany rezultat                                                                  |
| --- | --------- | ------------------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | E2E       | Dodawanie lotu do delegacji                      | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada delegację | 1. Użytkownik wprowadza miejsce odlotu<br>2. Użytkownik wprowadza miejsce przylotu<br>3. Użytkownik wprowadza datę przylotu<br>4. Użytkownik wprowadza datę przylotu<br>5. Użytkownik klika przycisk dodania lotu | Wyświetla się komunikat o pozytywnym dodaniu lotu<br>Lot zostaje dodany do delegacji |
| 2   | E2E       | Dodawanie lotu do delegacji bez miejsca odlotu   | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza miejsce przylotu<br>2. Użytkownik wprowadza datę przylotu<br>3. Użytkownik wprowadza datę przylotu<br>4. Użytkownik klika przycisk dodania lotu                                           | Wyświetla się komunikat iż pole miejsca odlotu jest wymagane                         |
| 3   | E2E       | Dodawanie lotu do delegacji bez miejsca przylotu | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza miejsce odlotu<br>2. Użytkownik wprowadza datę przylotu<br>3. Użytkownik wprowadza datę przylotu<br>4. Użytkownik klika przycisk dodania lotu                                             | Wyświetla się komunikat iż pole miejsca przylotu jest wymagane                       |
| 4   | E2E       | Dodawanie lotu do delegacji bez daty odlotu      | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza miejsce odlotu<br>2. Użytkownik wprowadza miejsce przylotu<br>3. Użytkownik wprowadza datę przylotu<br>4. Użytkownik klika przycisk dodania lotu                                          | Wyświetla się komunikat iż data odlotu jest wymagana                                 |
| 5   | E2E       | Dodawanie lotu do delegacji bez daty przylotu    | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza miejsce odlotu<br>2. Użytkownik wprowadza miejsce przylotu<br>3. Użytkownik wprowadza datę przylotu<br>4. Użytkownik klika przycisk dodania lotu                                          | Wyświetla się komunikat iż data przylotu jest wymagana                               |
| 6   | E2E       | Dodawanie lotu do nieistniejącej delegacji       | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza miejsce odlotu<br>2. Użytkownik wprowadza miejsce przylotu<br>3. Użytkownik wprowadza datę przylotu<br>4. Użytkownik wprowadza datę przylotu<br>5. Użytkownik klika przycisk dodania lotu | Wyświetla się komunikat iż dana delegacja nie istnieje                               |
