## 1. Diagram Sekwencji

@startuml
Client->DelegationService:{GET} getExpenses()
DelegationService->DelegationRepository:getExpenses()
DelegationRepository->DelegationService
DelegationService->ExpenseService:getFiles()
ExpenseService->ExpenseRepository:getFiles()
ExpenseRepository->ExpenseService
ExpenseService->DelegationService
DelegationService->Client
@enduml

## 2. Opis techniczny i funkcjonalny

### Żądanie:

**Endpoint URL:** GET /delegations/{delegation_id}/expenses

- **delegation_id** jako **Long**

**Wymagane nagłówki:** Authorization

**Wymagania:** Delegacja musi istniec

**Query:**

- `page` która strona jest pobierana(domyślna wartość 1)
- `size` rozmiar strony(domyślna wartość 10)
- `expenseName` pole filtrujące. Filter przepuści wszystkie wydatki, których nazwy zaczynac sie beda na podana wartość
- `sort` pola, po których mają odbywać się sortowania **`.asc`** po nazwie pola oznacza sortowanie rosnąco, **`.desc`** po nazwie pola oznacza sortowanie malejąco (domyślna wartość **`expenseDate.desc`**)

**Sort**
Sortować można po polach:

- `expenseName`
- `expenseValue`
- `expenseDate`

**Przykład**
/delegations/1/expense?page=2&size=8&expenseName=wa&sort=expenseName.desc

### Pozytywna odpowiedź:

**Status code:** 200

**Media type:** application/json

**Data:**

```json
{
  "totalSize": 12,
  "data": [
    {
      "id": 1,
      "expenseName": "Waciki",
      "expenseDate": "2019-10-22",
      "expenseValue": 19.29,
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
      "expenseName": "Ksiazka do springa",
      "expenseDate": "2019-10-22",
      "expenseValue": 28.29,
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

#### Dodatkowe informacje:
`epxenseDate` będzie w formacie: `yyyy-MM-dd`

#### Możliwe błędy:

- Status code `401` jeśli użytkownik jest niezalogowany
- Status code `403` jeśli użytkownik nie posiada uprawnień, oraz jeśli ma rolę `employee` i delegacja nie należy do uzytkownika
- Status code `400` jeśli w zapytaniu występują niepoprawne parametry (nieodpowiedni format)

#### Możliwe kody błędów (errorCode)

- w przypadku błędów 401, 403, 400 zwracany jest tylko status code
- delegation-not-found - kiedy nie udało się znaleźć delegacji z podanym id
- file-not-found - kiedy nie udało się znaleźć pliku o podanym id

```json
"errorCode": "delegation-not-found"
```

```json
"errorCode": "file-not-found"
```

## 3. Mockupy

### Przegladarka

#### Lista wydatków

![Browser mockup](mockups/expenses_list_web.png?raw=true "Browser")

#### Web expander - załączniki

![Attachments rxpander web](mockups/attachment_expander_web.png?raw=true "Attachments expander web")

#### Picture viewer

![Picture viewer](mockups/picture_viewer_web.png?raw=true "Picture viewer")

### Mobile

#### Lista wydatków - mobile

![Expenses List](mockups/expenses_list_mobile.png?raw=true "Expenses List")

#### Pagination dla mobile - ładowanie kolejnych wydatków

![Pagination mobile](mockups/loading_expenses_mobile.png?raw=true "Pagination mobile")

#### Mobile expander - załączniki

![Attachments expander mobile](mockups/attachment_expander_mobile.png?raw=true "Attachment Expander mobile")

#### Sortowanie

![Sorting mobile](mockups/sorting-mobile.png?raw=true "Sorting mobile")

## 4. Przypadki testowe

| Lp. | Typ testu | Nazwa                                        | Warunki wstępne                                                                                                    | Kroki wykonania                                                                 | Oczekiwany rezultat                                                                                 |
| --- | --------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | e2e       | Wyświetlenie wydatków delegacji              | Użytkownik jest zalogowany w systemie. Delegacja posiada przypisane wydatki.                                       | 1.) Użytkownik wybiera delegacęję z listy delegacji.                            | Wyswietla się lista delegacji. Liczba wyświetlonych wydatków zgadza się z listą pobranych wydatków. |
| 2   | e2e       | Wyświetlenie pustej listy wydatków delegacji | Użytkownik jest zalogowany w systemie. Delegacja nie posiada przypisanych wydatków.                                | 1.) Użytkownik wybiera delegacęję z listy delegacji.                            | Wyswietla informacja o braku przypisanych wydatków                                                  |
| 3   | e2e       | Wyświetlenie listy załączników               | Użytkownik jest zalogowany w systemie. Delegacja posiada przypisane wydatki. Wydatek posiada przypisane załączniki | 1.) Użytkownik wybiera wydatek z listy wydatków.                                | Wyświetla się lista załączników                                                                     |
| 4   | e2e       | Sortowanie wydatków                          | Użytkownik jest zalogowany w systemie. Delegacja posiada przypisane wydatki.                                       | 1.) Użytkownik klika na odpowiedni nagłówek/wybiera wartość z listy sortowania. | Lista zostaje posortowana według wybranego kryterium                                                |
| 5   | e2e       | Filtrowanie wydatków                         | Użytkownik jest zalogowany w systemie. Delegacja posiada przypisane wydatki.                                       | 1.) Użytkownik wprowadza frazę w input filtrowania.                             | Lista wyświetla tylko elementy zawierające w nazwie podaną frazę                                    |
