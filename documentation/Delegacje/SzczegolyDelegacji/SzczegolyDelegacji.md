## IDEMIA2019-10 Szczegóły delegacji

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBEoKpDAz6rSqdDIKrFBCdCpmjEBIhBJ4wrIe6BUAPmOKWZwmXABSWlpYp9Bwf4ruIf0hzDsEnHSCulpIifgeIfJePmWUP39U0geNo4PPXgaHs2tLniJe044f8xNL9B4ZDpYbrAyhaSKlDIG0490000)

### 2. Opis techniczny i funkcjonalny

#### 2.1 Wyświetlanie

**Wymagana rola:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Przykład odpowiedzi:**

**Szczegóły delegacji**

**Endpoint URL:** GET /delegations/{delegation_id}

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** Lista FlightDto

**Przykładowe dane:**

- delegation_id: Id delegacji
```json
{
  "version": 4,
  "id": 1,
  "startDate": "2019-01-01T10:19:19",
  "endDate": "2019-02-01T10:19:19",
  "destinationCountry": "Poland",
  "advancePayment": 200,
  "diet": {
    "version": 0,
    "perDiem": "50",
    "currency": "PLN"
  },
  "destinationLocation": "Radom",
  "delegationObjective": "Buy high quality rice",
  "status": "CREATED"
}
```

**Wydatki**

**Endpoint URL:** GET /delegations/{delegation_id}/expenses

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** Lista FlightDto

**Przykładowe dane:**

- delegation_id: id delegacji
```json
{
  "totalSize": 12,
  "data": [
    {
      "id": 1,
      "version": 1,
      "expenseName": "Waciki",
      "expenseDate": "2019-10-22",
      "expenseValue": 19.29,
      "exchangeRate": 3.25,
      "expenseCurrency": "PLN",
      "paymentType": "Card",
      "files": [
        {
          "id": 1,
          "filename": "wyciag.pdf"
        },
        {
          "id": 2,
          "filename": "inny.jpg"
        }
      ]
    },
    {
      "id": 2,
      "version": 2,
      "expenseName": "Ksiazka do springa",
      "expenseDate": "2019-10-22",
      "expenseValue": 28.29,
      "exchangeRate": null,
      "expenseCurrency": "PLN",
      "paymentType": "Cash",
      "files": [
        {
          "id": 3,
          "filename": "ksiazka.pdf"
        }
      ]
    }
  ]
}
```

**Zakwaterowanie**

**Endpoint URL:** GET /delegations/:delegationId/accommodations

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

**Loty**

**Endpoint URL:** GET /delegations/:delegationId/flights

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** Lista FlightDto

**Przykładowe dane:**

```json
[
  {
    "id": 1,
    "version": 1,
    "from": "Warsaw",
    "to": "Paris",
    "departureDate": "2019-01-01T10:00:00",
    "arrivalDate": "2019-01-01T12:00:00"
  },
  {
    "id": 2,
    "version": 1,
    "from": "Paris",
    "to": "Warsaw",
    "departureDate": "2019-01-02T10:00:00",
    "arrivalDate": "2019-01-02T12:00:00"
  }
]
```

**Checklista**

**Endpoint URL:** GET /delegations/{delegationId}/checklist

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** Lista FlightDto

**Przykładowe dane:**

- delegationId: Id delegacji
```json
{
  "id": 1,
  "version": 0,
  "activities": [
    {
      "id": 1,
      "version": 0,
      "task": "task1",
      "description": "desc1",
      "isDone": false
    },
    {
      "id": 2,
      "version": 0,
      "task": "task2",
      "description": "desc2",
      "isDone": false
    }
  ]
}
```

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny

#### Możliwe kody błędów:

- `delegation-not-found` -jeśli delegacja nie została znaleziona

### 3. Mockupy

#### Web

##### Ekran szczegółów delegacji

![Browser mockup](mockupy/web-details.png?raw=true "Browser-details")

#### Mobile

##### Ekran szczegółów delegacji

![Mobile mockup](mockupy/mobile-details.png?raw=true "mobile-details")

##### Opcje dostępne z menu w header bar

![Mobile mockup](mockupy/mobile-options.png?raw=true "mobile-options")

##### Zakładka cheklist

![Mobile mockup](mockupy/mobile-checklist.png?raw=true "Mobile-checklist")

### 4. Test cases

| Lp. | Typ testu | Nazwa                             | Warunki wstępne             | Kroki wykonania                                   | Oczekiwany rezultat           |
| --- | --------- | --------------------------------- | --------------------------- | ------------------------------------------------- | ----------------------------- |
| 1.  | E2E       | Wyświetlenie szczegółów delegacji | Użytkownik jest zalogowany. | 1. Użytkownik wybiera delegację z listy delegacji | Wyświetlenie danych delegacji |
