## IDEMIA2019-186 DodajZakwaterowanieDoDelegacji

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/TP71IaGX58RtFeNBWl45N5m6iY2uYsYUGEUSx0oEPz8pmILwzmHhRf6pKL7v_j_FRHLVv7nCsZ7umypYs672wFS7KdU9C8kP-euGvnsMTzgZ_NZYAf_wrCRry25HV9MRFZbX_VApskYPSzHmkVe8j-eVzNVGCpOs2PV5Ue0_v6_iPYU5LYZ2_V6KU46SEL8U9e8N7tn53K6Deim4mRwTiImAWhbIfnaX8QnZmaXMhpruhvcwONjHfhQOeNs7-W80)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** EMPLOYEE

**Wymagane nagłówki:** Authorization

**Endpoint URL:** POST /delegations/:delegationId/accommodations

**Query:** -

**Typ nośnika:** application/json

**Typ danych:** AccommodationDto

**Przykładowe dane:**

```json
{
  "hotelName": "Gloria Hotel",
  "checkInDate": "2019-01-01T10:00:00",
  "checkOutDate": "2019-05-12T10:00:00"
}
```

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** AccommodationDto

**Przykładowe dane:**

```json
{
  "id": 1,
  "version": 0,
  "hotelName": "Gloria Hotel",
  "checkInDate": "2019-01-01T10:00:00",
  "checkOutDate": "2019-05-12T10:00:00"
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

| Lp. | Typ testu | Nazwa                                                         | Warunki wstępne                                                       | Kroki wykonania                                                                                                                                                                                                                          | Oczekiwany rezultat                                                                            |
| --- | --------- | ------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | E2E       | Dodawanie zakwaterowania do delegacji                         | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada delegację | 1. Użytkownik wprowadza nazwę hotelu<br>2. Użytkownik wprowadza datę zakwaterowania<br>3. Użytkownik wprowadza datę wykwaterowania<br>4. Użytkownik wprowadza datę wykwaterowania<br>5. Użytkownik klika przycisk dodania zakwaterowania | Wyświetla się komunikat o pozytywnym dodaniu zakwaterowania<br>Lot zostaje dodany do delegacji |
| 2   | E2E       | Dodawanie zakwaterowania do delegacji bez nazwy hotelu        | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza datę zakwaterowania<br>2. Użytkownik wprowadza datę wykwaterowania<br>3. Użytkownik klika przycisk dodania zakwaterowania                                                                                        | Wyświetla się komunikat iż pole nazwa hotelu jest wymagane                                     |
| 3   | E2E       | Dodawanie zakwaterowania do delegacji bez daty zakwaterowania | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza nazwę hotelu<br>2. Użytkownik wprowadza datę wykwaterowania<br>3. Użytkownik klika przycisk dodania zakwaterowania                                                                                               | Wyświetla się komunikat iż pole data zakwaterowania jest wymagana                              |
| 4   | E2E       | Dodawanie zakwaterowania do delegacji bez daty wykwaterowania | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza nazwę hotelu<br>2. Użytkownik wprowadza datę zakwaterowania<br>3. Użytkownik klika przycisk dodania zakwaterowania                                                                                               | Wyświetla się komunikat iż data wykwaterowania jest wymagana                                   |  |
| 5   | E2E       | Dodawanie zakwaterowania do nieistniejącej delegacji          | Użytkownik jest zalogowany w systemie                                 | 1. Użytkownik wprowadza nazwę hotelu<br>2. Użytkownik wprowadza datę zakwaterowania<br>3. Użytkownik wprowadza datę wykwaterowania<br>4. Użytkownik klika przycisk dodania zakwaterowania                                                | Wyświetla się komunikat iż dana delegacja nie istnieje                                         |
