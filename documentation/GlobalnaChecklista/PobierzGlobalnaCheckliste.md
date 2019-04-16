## IDEMIA2019-86 PobierzGlobalnaCheckliste

### 1. Diagram sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuL9opibCpIjHqhLJSiv8JSxEoImkSSxFAodApyb9BLAoIayjWOjhQ79XLOIiDpYrg2mpEHL3OqfYIM9IOd6gWeiJ5wPgNJiN9wl2qjIYIYuN9rsivi55i6d7vNficf0T3j87yJz2gKj9FfT3QbuAC7G0)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** EMPLOYEE lub TRAVEL_MANAGER

**URL:** GET /checklist

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** ChecklistDto

**Przykładowa odpowiedź:**

```json
{
  "activities": [
    {
      "id": 1,
      "version":  1,
      "task": "task1",
      "description": "desc1"
    },
    {
      "id": 2,
      "version": 1,
      "task": "task2",
      "description": "desc2"
    }
  ]
}
```

#### Możliwe błędy:

- Status 401 jeśli użytkownik nie jest zalogowany
- Status 403 jeśli użytkownik nie ma odpowiedniej roli
- Status 400 jeśli naruszone zostały ograniczenia nałożone na dane + informacja o naruszonych ograniczeniach
- Status 500 jeśli wystąpił nieznany błąd po stronie serwera
- Status 400 jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

##### Możliwe kody błędów:

- checklist-not-found - jeśli globalna checklista nie istnieje

### 3. Mockups

#### Mobile

![Mobile](./mockups/MobileChecklist.png?raw=true "Mobile")

#### Web

![Web](./mockups/WebChecklist.png?raw=true "Web")

### 4. Przypadki testowe

| Lp. | Typ testu | Nazwa                       | Warunki wstępne            | Kroki wykonania                                      | Oczekiwany rezultat                                        |
| --- | --------- | --------------------------- | -------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| 1.  | E2E       | Załaduj globalną checklistę | Użytkownik jest zalogowany | 1. Użytkownik wchodzi do strony globalnej checklisty | Strona ładuje listę zadań korzystając z API i wyświetla ją |
