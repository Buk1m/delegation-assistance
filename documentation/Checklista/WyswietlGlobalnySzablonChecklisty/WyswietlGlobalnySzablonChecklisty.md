## IDEMIA2019-182 Wyświetl globalny szablon checklisty

### 1. Diagram Sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuL9opibCpIjHqhLJSiv8JSxEoImk2KdDBSX9B4brpiyhAShFoKajKh9AJot1aDVGvCAh2PkPmQb5PPd9gJWDJ4aiIKnAB4vLS772OZXCjwwTYvDLOMbgKIMNYvCkNdimPF0PIoWKY34CEG10va725rEhIqa-bqDgNWem5W00)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** TRAVEL_MANAGER

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /checklist

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** ChecklistTemplateDto

**Przykładowe odpowiedź:**

```json
{
  "activities": [
    {
      "version": 0,
      "id": 1,
      "task": "Influenza vaccine",
      "description": "You must have an influenza vaccine.",
      "priority": 1
    },
    {
      "version": 0,
      "id": 2,
      "task": "Visa",
      "description": "You must get a visa to the destination country.",
      "priority": 2
    },
    {
      "version": 0,
      "id": 4,
      "task": "Medicines",
      "description": "You should buy headache medications.",
      "priority": 3
    },
    {
      "version": 0,
      "id": 3,
      "task": "Flight booking",
      "description": "You must book your flight 7 days in advance.",
      "priority": 4
    }
  ]
}
```

#### Dodatkowe informacje

- zwórcona lista aktywności jest posortowana według priorytetu

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli użytkownik nie ma uprawnień
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- checklist-not-found - jeśli nie ma globalnego szablonu checklisty

### 3. Mockupy

#### Przeglądarka

![Browser show list](./mockupy/WEB_global.png?raw=true)

### 4. Przypadki testowe

| Lp. | Typ testu | Nazwa                   | Warunki wstępne         | Kroki wykonania                                      | Oczekiwany rezultat               |
| --- | --------- | ----------------------- | ----------------------- | ---------------------------------------------------- | --------------------------------- |
| 1.  | E2E       | Wyświetlenie checklisty | Manager jest zalogowany | 1. Manager przechodzi do strony globalnej checklisty | Wyświetla się globalna checklista |
