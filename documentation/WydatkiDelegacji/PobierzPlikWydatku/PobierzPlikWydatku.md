## IDEMIA2019-1 Login

### 1. Diagram sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDKGZ8JyfCBQeAoCdC3gzCIIp9BkLopibCpIlHjNEjA4ZDAquDJYqgoqnEjQfsTmsfLKXFBN7Bp4dLqEH2bOOh3qejo2_EBCalghH2gCMGGpSTmpIWHXW7oHmaKO8cGBp1vP2QbmBqA1S0)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/:delegation_id/expenses/:expense_id/files/:file_id

- **delegation_id** jako **Long**
- **expense_id** jako **Long**
- **file_id** jako **Long**

**Query:** -

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Dodatkowe informacje

-

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** multipart/form-data

**Typ danych:** plik binarny

**Przykładowe dane:** -

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- delegation-not-found - kiedy nie udało się znaleźć delegacji z podanym id
- expense-not-found - kiedy nie udało się znaleźć wydatku z podanym id
- file-not-found - kiedy nie udało się znaleźć pliku o podanym id

### 3. Mockupy

-

### 4. Test cases

-
