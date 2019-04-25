## IDEMIA2019-15 Jako Travel Manager mogę tworzyć nowe checklisty

### 1. Diagram sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuL9opibCpIjHqhLJSiv8JSxEoImkSSxFAodApyb9BLAoIan9WOjhm5ak9VaAoKWSJIwikf4D3KujAijCJiLb8i8uJQwKn9B4fCJYL0KN9ovC0tJjN9oi2ajJYogv75BpKe2U0000)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** TRAVEL_MANAGER

**URL:** POST /checklists

**Typ nośnika:** application/json

**Typ danych:** ChecklistDto

**Przykładowe dane:**

```json
{
  "countryISO3": "POL",
  "activities": [
    {
      "task": "task1",
      "description": "desc1"
    },
    {
      "task": "task2",
      "description": "desc2"
    },
    {
      "task": "task3",
      "description": "desc3"
    }
  ]
}
```

#### Prawidłowa odpowiedź:

**Status:** 200

#### Możliwe błędy:

- Status 500 jeśli wystąpił nieznany błąd po stronie serwera
- Status 401 jeśli użytkownik nie jest zalogowany
- Status 403 jeśli użytkownik nie ma odpowiedniej roli
- Status 400 jeśli naruszone zostały ograniczenia nałożone na dane + informacja o naruszonych ograniczeniach
- Status 400 jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

##### Możliwe kody błędów:

- checklist-for-country-already-exists - jeśli checklista dla tego kraju już istnieje

### 3. Mockups

#### Mobile

![Mobile](./mockups/Mobile.png?raw=true "Mobile")

#### Web

![Web](./mockups/Web.png?raw=true "Web")

### 4. Przypadki testowe

| Lp. | Typ testu | Nazwa                                | Warunki wstępne                             | Kroki wykonania                                                                  | Oczekiwany rezultat                           |
| --- | --------- | ------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| 1.  | E2E       | Dodanie zadania do checklisty        | Użytkownik z rolą manager jest zalogowany   | 1. Użytkownik wypełnia formularz dodania checklisty 2. Naciska przycisk "Create" | checklisty zostanie dodana                    |
| 2.  | E2E       | Wejście do strony dodania checklisty | Użytkownik bez roli manager jest zalogowany | 1. Użytkownik wpisuje w pasek przeglądarki adres dodania checklisty              | Router nie wpuszcza użytkownika do tej strony |
