## IDEMIA2019-26 GetDelegations

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/hPAnIiKm68NtF4L77Ve23gMerKrA5PnZUuW_fab9_jPMyTsj58a90UzmrvplV3c1r9wbutdKHMjV2ExZUHialv6uqGJ3PTLXieuVuHRgSVLvtpnz5GhSEYo4zoEzk1GHLbQtq52IoPhVfWA7mxsG477fn-Q9hTkolHJAt9VpHnjFMdn76ZwdQjO9nYD5ztrH4iWmDeMZC3MdkZCyzE6w_JExMVjNQHGwoV0YPFz8ZjyXQfXX7hNu1W00)

### 2. Opis techniczny i funkcjonalny
Użytkownik może podejrzeć raport, nie jest to jednak jednoznaczne z jego wygenerowaniem i wysłaniem do Travel Managera w celu akcpetacji.
Pliki widoczne w preview nie są dołączone do generowanego raportu!! Dowodem opłacenia wydatku jest orygianlny paragon/wyciąg transakcji z konta. Jest on potrzebny do dołączenia do delegacji w wersji fizyczej

#### Żądanie:

**Wymagana rola:** EMPLOYEE(tylko swoja), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/{delegationId}/report-preview

## **Query:**

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:**

**Typ danych:** application/json

**Przykładowe dane:**

```json
{
  "startDate": "2019-02-03T10:00:00",
  "endDate": "2019-02-06T00:00:00",
  "duration": 3,
  "destinationCountry": "Poland",
  "destinationLocation": "Radom",
  "advancePayment": 200,
  "place": "Fill this cell",
  "delegationObjective": "Buy high quality rice",
  "flights": [
    {
      "from": "Warsaw",
      "to": "Paris",
      "departureDate": "2019-02-03",
      "departureTime": "10:00:00",
      "arrivalDate": "2019-02-03",
      "arrivalTime": "12:00:00"
    }
  ],
  "accommodations": [
    {
      "hotelName": "Gloria Hotel",
      "checkInDate": "2019-02-03",
      "checkInTime": "12:30:00",
      "checkOutDate": "2019-02-06",
      "checkOutTime": "10:00:00"
    }
  ],
  "diet": {
    "perDiem": 45,
    "currency": "EUR",
    "exchangeRate": 4.24
  },
  "meals": {
    "breakfasts": 2,
    "lunches": 3,
    "dinners": 1
  },
    "dietReturns": {
      "entitlements": {
        "perDiemEntitlement": "300%",
        "breakfastEntitlement": "-30%",
        "lunchesEntitlement": "-90%",
        "dinnersEntitlement": "-30%"
      },
      "totalEntitlement": "150%",
      "totalDiems": 58.5,
      "targetCurrency": "PLN",
      "exchangeAmount": 248.04
    },
    "expensesReturns": [ 
      {
        "expenseName": "Waciki",
        "expenseDate": "2019-01-04",
        "expenseValue": 19.29,
        "expenseCurrency": "EUR",
        "exchangeRate": 4.15,
        "paymentType": "Card",
        "targetCurrency": "PLN",
        "exchangeAmount": 80.05
      }
    ],
    "total": 328.09,
    "targetCurrency": "PLN"
  }
```

#### Żądanie:

**Wymagana rola:** EMPLOYEE(tylko swoja), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/{delegationId}/report-preview/files

**Query:** 

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:**

**Typ danych:** multipart/form-data

**Przykładowe dane:**

```
"Waciki": {plik binarny}
```

**Ogólny wygląd**
```
"Nazwa wydatku1": {plik binarny}
"Nazwa wydatku1": {plik binarny}
"Nazwa wydatku2": {plik binarny}
...
```

Odpowiedź dla `/delegations/{delegationId}/report-preview/files`, będzie wyglądała w postaci `"Nazwa wydatku": {plik binarny}`

#### Dodatkowe informacje

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli użytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny

#### Możliwe kody błędów:

- `delegation-not-found` jeśli delegacja nie została znaleziona

### 3. Mockupy

### Przeglądarka

![Browser mockup](./mockupy/web_raport.png?raw=true "Browser")

### 4. Test cases

| Lp. | Typ testu | Nazwa                      | Warunki wstępne                                                                 | Kroki wykonania                                                                                                                                                          | Oczekiwany rezultat                                                                                                                  |
| --- | --------- | -------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1.  | E2E       | Wyświetlenie raportu       | 1. Użytkownik jest zalogowany                                                   | 1. Zostaje utworzona delegacja 2. Dla utworzonej delegacji otwierany jest podgląd raportu 3. Porównane zostają dane raportu z danymi utworzonej delegacji                | Dane podglądu raportu zgadzają się z danymi utworzonej delegacji                                                                     |
| 2.  | E2E       | Pobieranie raportu         | 1. Użytkownik jest zalogowany 2. Istnieje delegacja, której raport można pobrać | 1. Przejście na podgląd delegacji 2. Sprawdzenie liczby plików w folderze docelowym 3. Kliknięcie przycisku `download` 4. Sprawdzenie ilości plików w folderze docelowym | Liczba plików powiększyła się o 1                                                                                                    |
| 3.  | E2E       | Przesłanie delegacji do TM | 1. Użytkownik jest zalogowany 2. Istnieje delegacją którą można przesłać        | 1. Przejście na stronę podglądu raportu 2. Kliknięcie przycisku `Send to Travel Manager`                                                                                 | 1. Na ekranie pojawia się notyfikacja o przesłaniu 2. Następuje powrót na listę delegacji 3. Delegacja zmieniła status na "Prepared" |
