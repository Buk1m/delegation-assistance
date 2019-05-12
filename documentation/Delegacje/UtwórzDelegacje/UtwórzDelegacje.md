## IDEMIA2019-1 Login

### 1. Diagram sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDKGWjAJ-ykQZA9JKdDJqnEIkLopadCpMlHDSE8bAIcPyNd5fKbfcSQbKTa5zSKgjGd5YMYf3KqEJ2K8ciEIYr8ByuioI_gD8AGsDAOabYKc9nga9A4XSs7RfsAKbMXQMfHPLSAKcwE4m5EZQp93Er6Bi9sFo14C5qEb03902GLBc4-7CvfEQb08CB0000)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** EMPLOYEE

**Wymagane nagłówki:** Authorization

**Endpoint URL:** POST /delegations

**Query:** -

**Typ nośnika:** application/json

**Typ danych:** DelegationDto

**Przykładowe dane:**

```json
{
  "startDate": "1998-02-03T01:01:01",
  "endDate": "1998-03-03T01:01:02",
  "advancePayment": 200,
  "destinationCountryId": 1,
  "diet": {
    "perDiem": 50,
    "currency": "PLN"
  },
  "destinationLocation": "Radom",
  "delegationObjective": "Buy high quality rice"
}
```

`startDate`: wymagane pole, format: `yyyy-MM-dd'T'HH:mm:ss`
`endDate`: wymagane pole, `endDate > startDate`, format `yyyy-MM-dd'T'HH:mm:ss`
`destinationCountry`: wymagane pole, musi mieć długość 3 znaków
`destinationLocation`: wymagane pole
`delegationObjective`: wymagane pole

#### Dodatkowe informacje

Delegacja jest tworzona ze statusem `CREATED`

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** DelegationDto

**Przykładowe dane:**

```json
{
  "id": 1,
  "version": 2,
  "startDate": "2019-01-01T10:19:19",
  "endDate": "2019-02-01T10:19:19",
  "destinationCountryISO3": "BFA",
  "destinationLocation": "Radom",  
  "advancePayment": 200,
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
```

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny

#### Możliwe kody błędów:

-

### 3. Mockupy

#### Wyszukiwarka

![Browser mockup](mockupy/web.png?raw=true "Browser")

#### Lista krajów przy wybieraniu kraju delegacji

![Browser error](mockupy/webCountries.png?raw=true "Browser Error")

#### Wyszukiwarka - błędy

![Browser error](mockupy/webError.png?raw=true "Browser Error")

#### Systemy mobilne

![Mobile](mockupy/mobile.png?raw=true "Mobile")

#### Systemy mobilne - błędy

![Mobile error](mockupy/mobileError.png?raw=true "Mobile Error")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                                                                        | Warunki wstępne                       | Kroki wykonania                                                                                                                                                                                                                                                                                                                            | Oczekiwany rezultat                                                                                        |
| --- | --------- | -------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 1   | E2E       | Stworzenie nowej delegacji                                                                   | Użytkownik jest zalogowany w systemie | 1. Użytkownik wprowadza nazwę kraju<br>2. Użytkownik wprowadza nazwę miasta<br>3. Użytkownik wprowadza cel delegacji<br>4. Użytkownik wybiera datę rozpoczęcia delegacji<br>5. Użytkownik wybiera datę zakończenia delegacji<br>6. Użytkownik naciska przycisk tworzenia delegacji                                                         | Wyświetlenie informacji o pozytywnym utworzeniu delegacji<br>Delegacja została utworzona                   |
| 2   | E2E       | Próba stworzenia delegacji bez wybrania kraju                                                | Użytkownik jest zalogowany w systemie | 1. Użytkownik wprowadza nazwę miasta<br>2. Użytkownik wprowadza cel delegacji<br>3. Użytkownik wybiera datę rozpoczęcia delegacji<br>4. Użytkownik wybiera datę zakończenia delegacji<br>5. Użytkownik naciska przycisk tworzenia delegacji                                                                                                | Wyświetlenie informacji iż pole kraju jest wymagane                                                        |
| 3   | E2E       | Próba stworzenia delegacji bez wybrania miasta                                               | Użytkownik jest zalogowany w systemie | 1. Użytkownik wprowadza nazwę miasta<br>2. Użytkownik wprowadza cel delegacji<br>3. Użytkownik wybiera datę rozpoczęcia delegacji<br>4. Użytkownik wybiera datę zakończenia delegacji<br>5. Użytkownik naciska przycisk tworzenia delegacji                                                                                                | Wyświetlenie informacji iż pole miasta jest wymagane                                                       |
| 4   | E2E       | Próba stworzenia delegacji bez wybrania czasu rozpoczęcia                                    | Użytkownik jest zalogowany w systemie | 1. Użytkownik wprowadza nazwę miasta<br> 2. Użytkownik wprowadza nazwę miasta<br>3. Użytkownik wprowadza cel delegacji<br>4. Użytkownik wybiera datę zakończenia delegacji<br>5. Użytkownik naciska przycisk tworzenia delegacji                                                                                                           | Wyświetlenie informacji iż pole czasu rozpoczęcia delegacji jest wymagane                                  |
| 5   | E2E       | Próba stworzenia delegacji bez wybrania czasu zakończenia                                    | Użytkownik jest zalogowany w systemie | 1. Użytkownik wprowadza nazwę miasta<br>2. Użytkownik wprowadza nazwę miasta<br>3. Użytkownik wprowadza cel delegacji<br>4. Użytkownik wybiera datę rozpoczęcia delegacji<br>5. Użytkownik naciska przycisk tworzenia delegacji                                                                                                            | Wyświetlenie informacji iż pole czasu zakończenia delegacji jest wymagane                                  |
| 6   | E2E       | Próba stworzenia delegacji bez wybrania celu podróży.                                        | Użytkownik jest zalogowany w systemie | 1. Użytkownik wprowadza nazwę miasta<br>2. Użytkownik wprowadza nazwę miasta<br>3. Użytkownik wybiera datę rozpoczęcia delegacji<br>4. Użytkownik wybiera datę zakończenia delegacji<br>5. Użytkownik naciska przycisk tworzenia delegacji                                                                                                 | Wyświetlenie informacji iż pole celu podróży jest wymagane                                                 |
| 7   | E2E       | Próba ustawienia czasu zakończenia delegacji na datę wcześniejszą, niż rozpoczęcie delegacji | Użytkownik jest zalogowany w systemie | 1. Użytkownik wprowadza nazwę kraju<br>2. Użytkownik wprowadza nazwę miasta<br>3. Użytkownik wprowadza cel delegacji<br>4. Użytkownik wybiera datę rozpoczęcia delegacji<br>5. Użytkownik wybiera datę zakończenia delegacji, która jest wcześniejsza niż data rozpoczęcia delegacji<br>6. Użytkownik naciska przycisk tworzenia delegacji | Wyświetlenie informacji iż data rozpoczęcia delegacji musi być wcześniejsza niż data zakończenia delegacji |
