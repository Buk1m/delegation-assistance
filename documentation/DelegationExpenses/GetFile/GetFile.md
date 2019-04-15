### 1. Diagram Sekwencji

@startuml
Client->ExpenseService:{GET} getFile()
ExpenseService->ExpenseRepository:getFile()
ExpenseRepository->ExpenseService
ExpenseService->FileService:getFile()
FileService->ExpenseService
ExpenseService->Client
@enduml


### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Endpoint URL:** GET /delegations/{delegation_id}/expenses/{expense_id}/files/{file_id}

- **delegation_id** jako **Long**
- **expense_id** jako **Long**
- **file_id** jako **Long**

**Wymagane nagłówki:** Authorization

**Wymagania:** 
* Delegacja musi istniec
* Wydatek musi istnieć
* Plik musi istnieć

#### Pozytywna odpowiedź:

**Status code:** 200

**Media type:** multipart/form-data

**Data:** 
binarny plik

#### Możliwe błędy:

- Status code `401` jeśli użytkownik jest niezalogowany
- Status code `403` jeśli użytkownik nie posiada uprawnień, oraz jeśli ma rolę `employee` i delegacja nie należy do uzytkownika
- Status code `400` jeśli w zapytaniu występują niepoprawne parametry (nieodpowiedni format)

#### Możliwe kody błędów (errorCode)
- w przypadku błędów 401, 403, 400 zwracany jest tylko status code
- delegation-not-found - kiedy nie udało się znaleźć delegacji z podanym id
- expense-not-found - kiedy nie udało się znaleźć wydatku z podanym id
- file-not-found - kiedy nie udało się znaleźć pliku o podanym id

```json
"errorCode": "delegation-not-found"
```

```json
"errorCode": "expense-not-found"
```

```json
"errorCode": "file-not-found"
```

