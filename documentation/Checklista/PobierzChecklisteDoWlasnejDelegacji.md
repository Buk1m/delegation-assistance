## IDEMIA2019-14 Jako pracownik mogę zobaczyć checklistę powiązaną z moją delegacją

### 1. Diagram sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/TP112i8m54JtEOLafOjS88jIajp04yHsgC5lWZ-_WhStY5Y5k1tc3RmPgqIMzKfAUqh8eisW0mXBb5IoBrcu486rNI3-ZEb2gSh-eFgj7_e8lgS9BtHB6pj7YQTOiGjETVfc2CxULl131MVwarlKNVXhqUU-3Hhwli9-V8CKDIBFxQWd)
### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** EMPLOYEE

**URL:** GET /delegations/{delegationId}/checklist

delegationId - id delegacji

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Przykładowa odpowiedź:**

```json
{
    "delegationId": 1,
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

- Status 500 jeśli wystąpił nieznany błąd po stronie serwera
- Status 401 jeśli użytkownik nie jest zalogowany
- Status 403 jeśli użytkownik nie ma odpowiedniej roli lub delegacja o podanym id jest przypisana do innego użytkownika niż zalogowany
- Status 400 jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

##### Możliwe kody błędów:

- delegation-not-found - jeśli delegacja o podanym id nie istnieje

### 3. Mockups

#### Mobile

![Browser mockup](mockups/DelegationChecklist-mobile.png?raw=true "Browser")

#### Web

![Browser mockup](mockups/DelegationChecklist-web.png?raw=true "Browser")

### 4. Przypadki testowe
| Lp. | Typ | Nazwa | Wymagania wstępne | Działania użytkownika | Spodziewany rezultat |
| --- | --- | --- | --- | --- | --- |
|1.| manual | Zaznaczenie zadania | 1. Istnieje checklista 2. Zadanie nie jest zaznaczone | 1. Użytkownik zaznacza zadanie  | Zadanie jest zaznaczone |
|2.| manual | Odznaczenie zadania | 1. Istnieje checklista 2. Zadanie jest zaznaczone | 1. Użytkownik odznacza zadanie  | Zadanie jest odznaczone |
