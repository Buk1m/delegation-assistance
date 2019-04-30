## IDEMIA2019-1 Login

### 1. Diagram sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDKGZ8JyfCBQeAhqn9BCdEv7BEoKpDAz6rSqdDIKrFBCdCpmjEBIhBJ4wrgdPt3QbLI4yjSQqeICqhJYtMqEJ2K8MiCIYr8ByuioI_gD8ANHUc4YmsOZCTQWgK3pBNBJC7R2XK1bqbmWPanHYIw2QZ6KUawo21n-MGcfS235ek0000)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/:delegationId/expenses

- **delegation_id** jako **Long**

**Query:**

- **page** która strona jest pobierana **domyślna wartość** 1
- **size** rozmiar strony **domyślna wartość** 10
- **sort** pola, po których mają odbywać się sortowania `.asc` po nazwie pola oznacza sortowanie rosnąco, `.desc` po nazwie pola oznacza sortowanie malejąco **domyślna wartość** expenseDate.desc **dostępne wartości** expenseId, expenseDate

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Dodatkowe informacje

- Przykład URL:

```
/delegations/1/expense?page=2&size=8&expenseName=wa&sort=expenseName.desc
```

-`epxenseDate` będzie w formacie: `yyyy-MM-dd`

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** - lista ExpenseDto + ilość rekordów

**Przykładowe dane:**

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

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- delegation-not-found - kiedy nie udało się znaleźć delegacji z podanym id

### 3. Mockupy

#### Przeglądarka - Lista wydatków

![Browser mockup](mockupy/expenses_list_web.png?raw=true "Browser")

#### Przeglądarka - załączniki

![Attachments rxpander web](mockupy/attachment_expander_web.png?raw=true "Attachments expander web")

#### Przeglądarka - plik

![Picture viewer](mockupy/picture_viewer_web.png?raw=true "Picture viewer")

#### Systemy mobilne - Lista wydatków

![Expenses List](mockupy/expenses_list_mobile.png?raw=true "Expenses List")

#### Paginacja dla systemów mobilnych - ładowanie kolejnych wydatków

![Pagination mobile](mockupy/loading_expenses_mobile.png?raw=true "Pagination mobile")

#### Systemy mobilne - załączniki

![Attachments expander mobile](mockupy/attachment_expander_mobile.png?raw=true "Attachment Expander mobile")

#### Systemy mobilne - sortowanie

![Sorting mobile](mockupy/sorting-mobile.png?raw=true "Sorting mobile")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                        | Warunki wstępne                                                                                                    | Kroki wykonania                                                                 | Oczekiwany rezultat                                                                                 |
| --- | --------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | E2E       | Wyświetlenie wydatków delegacji              | Użytkownik jest zalogowany w systemie. Delegacja posiada przypisane wydatki.                                       | 1.) Użytkownik wybiera delegacęję z listy delegacji.                            | Wyswietla się lista delegacji. Liczba wyświetlonych wydatków zgadza się z listą pobranych wydatków. |
| 2   | E2E       | Wyświetlenie pustej listy wydatków delegacji | Użytkownik jest zalogowany w systemie. Delegacja nie posiada przypisanych wydatków.                                | 1.) Użytkownik wybiera delegacęję z listy delegacji.                            | Wyswietla informacja o braku przypisanych wydatków                                                  |
| 3   | E2E       | Wyświetlenie listy załączników               | Użytkownik jest zalogowany w systemie. Delegacja posiada przypisane wydatki. Wydatek posiada przypisane załączniki | 1.) Użytkownik wybiera wydatek z listy wydatków.                                | Wyświetla się lista załączników                                                                     |
| 4   | E2E       | Sortowanie wydatków                          | Użytkownik jest zalogowany w systemie. Delegacja posiada przypisane wydatki.                                       | 1.) Użytkownik klika na odpowiedni nagłówek/wybiera wartość z listy sortowania. | Lista zostaje posortowana według wybranego kryterium                                                |
| 5   | E2E       | Filtrowanie wydatków                         | Użytkownik jest zalogowany w systemie. Delegacja posiada przypisane wydatki.                                       | 1.) Użytkownik wprowadza frazę w input filtrowania.                             | Lista wyświetla tylko elementy zawierające w nazwie podaną frazę                                    |
