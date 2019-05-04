## IDEMIA2019-182 Edytuj globalny szablon checklisty

### 1. Diagram Sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuL9opibCpIjHqhLJSiv8JSxEoImk2KdDBSX9B4brpiyhAShFoKajKh8gBKW1YQ0hqO28fs18k9JaArWfO1FMvC9h4pQ71ASMbMKcfvBk2cnEqEG2garCIYnELN1nmk8Mc6MwTYvELeMbgKMLN2vEkdYTXI63prX28KsCOSZX1J8F4eUOMe71pUMGcfS2Z6a0)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** TRAVEL_MANAGER

**Wymagane nagłówki:** Authorization

**Endpoint URL:** PUT /checklist

**Typ nośnika:** application/json

**Typ danych:** ChecklistTemplateDto

**Przykładowe dane:**

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
    },
    {
      "task": "New task",
      "description": "This is a new task.",
      "priority": 5
    }
  ]
}
```

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
    },
    {
      "version": 0,
      "id": 5,
      "task": "New task",
      "description": "This is a new task.",
      "priority": 5
    }
  ]
}
```

#### Dodatkowe informacje

- w przypadku edycji istniejących aktywności musi być przesyłane ich id oraz wersja, które zostały wcześniej otrzymane
- nowa aktywnośc dodana do listy powinna być wysyłana bez określonego id oraz wersji (w przykładach aktywność o id = 5)

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli użytkownik nie ma uprawnień
- Status `409` jeśli szablon checklisty został po jej wczytaniu edytowany przez innego użytkownika
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- checklist-not-found - jeśli nie ma globalnego szablonu checklisty

### 3. Mockupy

#### Przeglądarka

![Browser show list](./mockupy/WEB_global.png?raw=true)
![Browser create task](./mockupy/WEB_create.png?raw=true)

### 4. Przypadki testowe

| Lp. | Typ testu | Nazwa                    | Warunki wstępne          | Kroki wykonania                                                    | Oczekiwany rezultat                                                                                                                                             |
| --- | --------- | ------------------------ | ------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.  | E2E       | Utworzenie nowego tasku  | Manager jest zalogowany. | 1. Manager tworzy nowy task 2. Manager zapisuje checklistę         | Wyświetlenie komunikatu o pomyślnym zapisaniu checklisty                                                                                                        |
| 2.  | E2E       | Usunięcie nowego tasku   | Manager jest zalogowany. | 1. Manager usuwa task 2. Manager zapisuje checklistę               | Wyświetlenie komunikatu o pomyślnym zapisaniu checklisty                                                                                                        |
| 3.  | E2E       | Zmiana kolejności tasków | Manager jest zalogowany. | 1. Manager zmienia kolejność tasków 2. Manager zapisuje checklistę | Wyświetlenie komunikatu o pomyślnym zapisaniu checklisty, następnie odświeża stronę i sprawdza, że pobrana checklista jest w tej samej kolejności jaką ustawił. |
