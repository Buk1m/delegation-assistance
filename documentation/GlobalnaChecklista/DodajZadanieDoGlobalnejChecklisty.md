## IDEMIA2019-86 DodajZadanieDoGlobalnejChecklisty

### 1. Diagram sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuL9opibCpIjHqhLJSiv8JSxEoImkSSxFAodApyb9BLAoIan92KaipWx9XyjgWFWk9VaA9H1QamkhJcG3WrEBoZAJKt6Q1ZPAaoibiIGnAR4uLS75YGjJiwwTYvDLOMbgKIMNGsfU2j3n0000)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** TRAVEL_MANAGER

**URL:** POST /checklist/tasks

**Typ nośnika:** application/json

**Typ danych:** TaskDto

**Przykładowe dane:**

```json
{
  "task": "task1",
  "description": "desc"
}
```

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

![Mobile](./mockups/MobileAddTask.png?raw=true "Mobile")

#### Web

![Web](./mockups/WebAddTask.png?raw=true "Web")

### 4. Przypadki testowe

| Lp. | Typ testu | Nazwa                                                    | Warunki wstępne                             | Kroki wykonania                                                               | Oczekiwany rezultat                             |
| --- | --------- | -------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------- |
| 1.  | E2E       | Dodanie zadania do globalnej listy                       | Użytkownik z rolą manager jest zalogowany   | 1. Użytkownik wypełnia formularz dodania zadania 2. Naciska przycisk "Create" | Zadanie zostanie dodane do globalnej checklisty |
| 2.  | E2E       | Wejście do strony dodania zadania do globalnej checklisy | Użytkownik bez roli manager jest zalogowany | 1. Użytkownik wpisuje w pasek przeglądarki adres dodania zadanie              | Router nie wpuszcza użytkownika do tej strony   |
