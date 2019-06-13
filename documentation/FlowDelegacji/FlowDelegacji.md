## IDEMIA2019-1 Login

### 1. Diagram sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDKGYlF3ex9pFB9JKdDJqnEUl8J9VyaAB4ijGStyIynFJKeaGkvvpCrBmINJk8afBC_BpWrAAopEHKg-e0nn1dZrg5WiIIv0o4j8Oc5uPQPEq18EN19KM99QdfbSxvUIMf5ILMPOavcIb04JHbGBFmQiJgBeG8VeS4fHRa5sUMv1TLMXK3lGos2rDEbrGhW1eWOMPLb5fScbF2vP2Qbm8CQou0)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** EMPLOYEE, TRAVEL_MANAGER, APPROVER, ACCOUNTANT (dla odpowiednich statusów)

**Wymagane nagłówki:** Authorization

**Endpoint URL:** PATCH /delegations/:delegation_id

- **delegation_id** jako **Long**

**Query:** -

**Typ nośnika:** application/json

**Typ danych:** DelegationDto

**Przykładowe dane:**

```json
{
  "version": 2,
  "status": "PREPARED"
}
```

- `version` - pole wymagane, pole wersji
- `status` - pole wymagane, powinno być przekazywane jako `string`

#### Dodatkowe informacje

- `Employee` może ustawić nastepujace statusy:
  - `PREPARED`
  - `CREATED`
  
- `Travel Manager` może ustawić następujace statusy:
    - `NEEDS_WORK`
    - `CHECKED`
    - `FINALIZED`
    - `APPROVED`

- `Approver` może ustawić następujące statusy
    - `APPROVED`
    - `NEEDS_WORK`

-`Accountant` może ustawić następujące statusy
    - `NEEDS_WORK`
    - `FINALIZED`

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi
- Status `409` jeśli delegacja nie uległa zmianie

#### Możliwe kody błędów:

- delegation-not-found - jeśli delegacja nie istnieje
- data-has-changed - jeśli delegacja została zaktualizowana przez innego użytkownika

### 3. Mockupy

##### Przeglądarka

![Page](./mockupy/page.png?raw=true "Page")

##### Błąd

![Error](./mockupy/error.png?raw=true "Error")

##### Sukces

![Success](./mockupy/success.png?raw=true "Success")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                | Warunki wstępne                                                                                     | Kroki wykonania                                                         | Oczekiwany rezultat                                                                                 |
| --- | --------- | ------------------------------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1.  | E2E       | Wysłanie delegacji do travel manager | Użytkownik jest zalogowany<br>Użytkownik posiada delegację, do którą chce wysłać do travel managera | 1. Użytkownik naciska przycisk wyslania do akceptacji do travel manager | Wyświetlenie komunikatu o dodaniu wysłaniu delegacji do travel managera<br>Delegacja zminiła status |
