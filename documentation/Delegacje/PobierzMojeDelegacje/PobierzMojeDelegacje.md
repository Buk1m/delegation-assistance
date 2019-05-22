## IDEMIA2019-26 GetDelegations

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/rPN1JeD048RlFCM4KvkK5sXCqo0NapOQMnzWW16dcUxgxgm6drvQD62aDzkKlH1-Xd__V3kJNNf5fs4ly61p9lUvjZlAIAZ2OaTHV2jCHkDa4RUYiZKRSkzSK3olIDTrf_l9oXOe6IfjUK_WsHGqWzzYCCeoWvwReWOF_lYOHYWAponAZaq5UGqbAW6QyhiYWcODX4aMdVP8hzQpMbSV8lO2flMJ9xUo5Pl9HeyxX1zX1l-G7ffLecAEdY1BZ-z3kPgqwVmjaAlRaZGvaT-H3wAdVOOFvax9OIvqqtrRGDbnY4Wy_SLy1ModLuvCk4DszeOytMOZOtIOt_RGBqzhiFV6YR0TaSiZ7EEaVh2-sD2_In90aNxXsK1UCHfJHWC_DdRjHJ_aa6tl-oQPMXyj6wEmboy0)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** EMPLOYEE

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/my

**Query:**

- **since** - data od kiedy poszukiwane są delegacje (względem `start_date`) **Domyślna wartość** null
- **until** - data do kiedy poszukiwane są delegacje (względem `start_date`) **Domyślna wartość** null
- **status** - status delegacji **Domyślna wartość** null

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** lista DelegationDto

**Przykładowe dane:**

```json
[
  {
    "id": 1,
    "version": 2,
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "destinationCountry": "Poland",
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED",
    "user": {
      "id": 1,
      "login": "amalysz",
      "firstName": "Adam",
      "lastName": "Małysz",
      "avatar": { base64 }
    }
  },
  {
    "id": 2,
    "version": 10,
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "destinationCountry": "Poland",
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED",
    "user": {
      "id": 1,
      "login": "amalysz",
      "firstName": "Adam",
      "lastName": "Małysz",
      "avatar": { base64 }
    }
  }
]
```

#### Dodatkowe informacje

-

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny

#### Możliwe kody błędów:

-

### 3. Mockupy

#### Przeglądarka

![Browser mockup](./mockupy/Delegations_website.png?raw=true "Browser mockup")

#### Systemy mobilne

![Mobile mockup](./mockupy/Delegations_mobile.png?raw=true "Mobile mockup")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                                                                                         | Warunki wstępne                                                                                                                  | Kroki wykonania                                                                                                                                         | Oczekiwany rezultat                                                    |
| --- | --------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | E2E       | Wyświetlanie listy delegacji                                                                                  | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik klika przycisk pobierania delegacji.                                                                                                      | Wyświetlenie listy delegacji                                           |
| 2   | E2E       | Wyświetlanie listy delegacji z określonym statusem.                                                           | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera status delegacji<br>2. Użytkownik klika przycisk pobierania delegacji.                                                            | Wyświetlenie listy delegacji                                           |
| 3   | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy                                                      | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od" kiedy<br>2. Użytkownik klika przycisk pobierania delegacji                                                              | Wyświetlenie listy delegacji                                           |
| 4   | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy                                                      | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "do" kiedy<br>2. Użytkownik klika przycisk pobierania delegacji                                                              | Wyświetlenie listy delegacji                                           |
| 5   | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy                                           | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | Użytkownik wybiera datę "od" oraz "do" i klika przycisk pobierania delegacji                                                                            | Wyświetlenie listy delegacji                                           |
| 6   | E2E       | Wyświetlanie listy delegacji z błędnie określonymi datami "od" i "do" kiedy (data "do" wcześniejsza niż "od") | Użytkownik jest zalogowany.                                                                                                      | 1. Użytkownik wybiera datę "od" kiedy<br>2. Użytkownik wybiera datę "do" kiedy wcześniejszą niż data "od" kiedy                                         | Wyświetlenie informacji iż data "do" musi być późniejsza niż data "od" |
| 7   | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy oraz statusem                                        | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od"<br>2. Użytkownik wybiera status<br>3. Użytkownik klika przycisk pobierania delegacji.                                   | Wyświetlenie listy delegacji                                           |
| 8   | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy oraz statusem                                        | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "do"<br>2. Użytkownik wybiera status<br>3. Użytkownik klika przycisk pobierania delegacji.                                   | Wyświetlenie listy delegacji                                           |
| 9   | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy oraz statusem.                            | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od"<br>2. Użytkownik wybiera datę "do"<br>3. Użytkownik wybiera status<br>4. Użytkownik klika przycisk pobierania delegacji | Wyświetlenie listy delegacji                                           |
