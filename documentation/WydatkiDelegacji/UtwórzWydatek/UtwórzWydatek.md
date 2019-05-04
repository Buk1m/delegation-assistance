## IDEMIA2019-1 Login

### 1. Diagram sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/XP112i8m44NtEKMNkiW5YfI2wAeBKSHrOWOPZ4dDJAjLF9L7y6AsAAKQmUNClC__ytDY5RWws6JDfySzN3QDKGnxCRK8ZcKsEvVW25OGQjn2Ubruubj2geRtXKPZyGdreYMKdf1zQD8_WZdQtg93kxd51ciPHGb0bMLX52kj21AZHUGhCwFJOmMX4KRBNy70CJ82nThOiK3YIU7TBljwe4LVVGsH79nfYnLF0)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** EMPLOYEE

**Wymagane nagłówki:** Authorization

**Endpoint URL:** POST /delegations/:delegationId/expenses

- **delegation_id** jako **Long**

**Query:** -

**Typ nośnika:** multipart/form-data

**Typ danych:** File

**Przykładowe dane:**

```
  "expenseName": "Expense Name",
  "expenseValue": "1234.56",
  "expenseDate": "2019-10-22",
  "exchangeRate": 2.55  
  "paymentType": "CREDIT_CARD",
  "expenseCurrency": "dzd",
  "attachments": [{ file }, { file }]
```

- `expenseName`: wymagane pole
- `expenseValue`: wymagane pole, większe od zera
- `expenseDate`: wymagane pole, w formacie `yyyy-MM-dd`
- `paymentType`: wymagane pole, możliwe wartości: `CREDIT_CARD`, `CASH`
- `expenseCurrency`: wymagane pole
- `attachments`: wymagany chociaż jeden plik
- `exchangeRate` opcjonalne pole

#### Dodatkowe informacje

- To zapytanie zawiera plik ("attachment": {file})

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** ExpenseDto

**Przykładowe dane:**

```json
{
  "id": 1,
  "version": 0,
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
  ],
}
```

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- delegation-not-found - jeśli delegacja nie istnieje
- user-not-found - jeśli użytkownik nie istnieje
- no-access-to-delegation - jeśli użytkownik probuje dodac expense do nie swojej delegacji
- could-not-save-file - jeśli się nie udało zapisać pliku, z powodu np.: złego formatu danych

### 3. Mockupy

#### Przeglądarka

![Form base mockup](./mockupy/form_base.png?raw=true "Base form")

#### Przeglądarka walidacja

![Form validation mockup](./mockupy/form_validation.png?raw=true "Form validation")

#### Przeglądarka błąd

![Error alert](./mockupy/error_alert.png?raw=true "Error alert")

#### Systemy mobilne

![Mobile form mockup](./mockupy/mobile_base.png?raw=true "Base form")

#### Systemy mobilne walidacja

![Mobile validation mockup](./mockupy/mobile_validation.png?raw=true "Form validation")

#### Systemy mobilne błąd

![Mobile error mockup](./mockupy/mobile_error_alert.png?raw=true "Error alert")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                 | Warunki wstępne                                                                              | Kroki wykonania                                                                                                                                                                                                                                                     | Oczekiwany rezultat                                                                        |
| --- | --------- | ------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1.  | E2E       | Dodanie nowego wydatku                | Użytkownik jest zalogowany<br>Użytkownik posiada delegację, do której chce dodać wydatek     | 1. Użytkownik podaje nazwę wydatku<br>2. Użytkownik podaje ścieżkę do pliku wydatku<br>3. Użytkownik wprowadza kwotę wydatku<br>4. Użytkownik wybiera walutę wydatku<br>5. Użytkownik kliknął dodania wydatku                                                       | Wyświetlenie komunikatu o dodaniu wydatku<br>Wydatek został dodany                         |
| 2.  | E2E       | Dodanie nowego wydatku bez nazwy      | Użytkownik jest zalogowany<br>Użytkownik posiada delegację, do której chce dodać wydatek     | 1. Użytkownik podaje ścieżkę do pliku wydatku<br>2. Użytkownik wprowadza kwotę wydatku<br>3. Użytkownik wybiera walutę wydatku<br>4. Użytkownik kliknął przycisk dodania wydatku                                                                                    | Wyświetlenie komunikatu iż nazwa wydatku jest wymagana                                     |
| 3.  | E2E       | Dodanie nowego wydatku bez pliku      | Użytkownik jest zalogowany<br>Użytkownik posiada delegację, do której chce dodać wydatek     | 1. Użytkownik podaje nazwę wydatku<br>2. Użytkownik wprowadza kwotę wydatku<br>3. Użytkownik wybiera walutę wydatku<br>4. Użytkownik kliknął dodania wydatku                                                                                                        | Wyświetlenie komunikatu iż plik jest wymagany                                              |
| 4.  | E2E       | Dodanie nowego wydatku bez kwoty      | Użytkownik jest zalogowany<br>Użytkownik posiada delegację, do której chce dodać wydatek     | 1. Użytkownik podaje nazwę wydatku<br>2. Użytkownik podaje ścieżkę do pliku wydatku<br>3. Użytkownik wybiera walutę wydatku<br>4. Użytkownik kliknął dodania wydatku                                                                                                | Wyświetlenie komunikatu iż kwota jest wymagana                                             |
| 5.  | E2E       | Dodanie nowego wydatku bez waluty     | Użytkownik jest zalogowany<br>Użytkownik posiada delegację, do której chce dodać wydatek     | 1. Użytkownik podaje nazwę wydatku<br>2. Użytkownik podaje ścieżkę do pliku wydatku<br>3. Użytkownik wprowadza kwotę wydatku<br>4. Użytkownik kliknął dodania wydatku                                                                                               | Wyświetlenie komunikatu iż waluta jest wymagana                                            |
| 6.  | E2E       | Podanie niewłaściwej ścieżki do pliku | Użytkownik jest zalogowany<br>Użytkownik posiada delegację, do której chce dodać wydatek     | 1. Użytkownik podaje nazwę wydatku<br>2. Użytkownik podaje ścieżkę do pliku wydatku z rozszerzeniem innym niż _.jpg, _.jpeg, _.png, _.bmp<br>3. Użytkownik wprowadza kwotę wydatku<br>4. Użytkownik wybiera walutę wydatku<br>5. Użytkownik kliknął dodania wydatku | Wyświetlenie komunikatu o niewłaściwym formacie pliku.                                     |
| 7.  | E2E       | Podanie pliku o zbyt dużym rozmiarze  | Użytkownik jest zalogowany<br>Użytkownik posiada delegację, do której chce dodać wydatek     | 1. Użytkownik podaje nazwę wydatku<br>2. Użytkownik podaje ścieżkę do pliku wydatku o zbyt dużym rozmiarze<br>3. Użytkownik wprowadza kwotę wydatku<br>4. Użytkownik wybiera walutę wydatku<br>5. Użytkownik kliknął dodania wydatku                                | Wyświetlenie się komunikatu o zbyt dużym rozmiarze pliku.                                  |
| 8.  | E2E       | Próba dodania wydatku bez delegacji   | Użytkownik jest zalogowany<br>Użytkownik nie posiada delegacji, do której chce dodać wydatek | 11. Użytkownik podaje nazwę wydatku<br>2. Użytkownik podaje ścieżkę do pliku wydatku<br>3. Użytkownik wprowadza kwotę wydatku<br>4. Użytkownik wybiera walutę wydatku<br>5. Użytkownik kliknął dodania wydatku                                                      | Wyświetlenie komunikatu o braku odpowiedniej delegacji, do której można przypisac wydatek. |
