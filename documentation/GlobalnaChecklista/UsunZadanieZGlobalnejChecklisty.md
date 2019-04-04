## IDEMIA2019-86 UsunZadanieZGlobalnejChecklisty

### 1. Diagram sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuL9opibCpIjHqhLJSiv8JSxEoImkSSxFAodApyb9BLAoIadDIIr93KaipdOhoi-5Az7moSzBLoW12dkcQ79XrOfiOd1gKLbcSYgHngKabYGc9HQdAhWuSM6QeMlducHLM9fQLCdba9gN0lG40000)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** TRAVEL_MANAGER

**URL:** DELETE /checklist/tasks/{id}

**Parametry ścieżki:**

- id - id zadania do usunięcia

#### Prawidłowa odpowiedź:

**Status:** 200

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

| Lp. | Typ testu | Nazwa                                                | Warunki wstępne                             | Kroki wykonania                                            | Oczekiwany rezultat                             |
| --- | --------- | ---------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| 1.  | E2E       | Wybierz i usuń zadania z checklisty                  | Użytkownik z rolą manager jest zalogowany   | 1. Użytkownik wybiera zadania 2. Naciska przycisk "Delete" | Zadania zostaną usunięte z globalnej checklisty |
| 2.  | E2E       | Wybierz i usuń zadania z checklisty bez roli manager | Użytkownik bez roli manager jest zalogowany | 1. Użytkownik wybiera zadania                              | Nie wyświetla się przycisk "Delete"             |
