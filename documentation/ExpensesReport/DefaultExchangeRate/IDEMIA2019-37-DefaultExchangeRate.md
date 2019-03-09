# IDEMIA2019-37-DefaultExchangeRate

**Description**

Jako pracownik mogę wybrać domyślny kurs walut dla rozliczenia delegacji.

Kryterium akceptacyjne:
 - Przy wyborze domyślnego kursu system pobiera średni kurs z dnia poprzedniego ze strony NBP


## Sequence diagram

```
@startuml
ExpenseSettingsPage->ExpenseSettingsPage: fetchExchangeRates()
Client-->ExpenseSettingsPage: tap button to change default rate
ExpenseSettingsPage->ExpenseService: saveDefaultExchangeRate({rate})
database db
ExpenseService->db: saveUserDefaultExchangeRate({rate})
db-->ExpenseService: return status
ExpenseService-->ExpenseSettingsPage: return status
ExpenseSettingsPage-->Client: return status
@enduml
```

## Technical and functional description

### Endpoints

#### Get exchange rates

**Endpoint URL:**
```
GET http://api.nbp.pl/api/exchangerates/tables/A
```

**Response:**
```json
[
    {
      "table": "A",
      "no": "048/A/NBP/2019",
      "effectiveDate": "2019-03-08",
      "rates": [
        {
          "currency": "bat (Tajlandia)",
          "code": "THB",
          "mid": 0.1209
        },
        {
          "currency": "dolar amerykański",
          "code": "USD",
          "mid": 3.8409
        },
        /* ... etc ... */
      ]
    }
  ]
```

#### Save settings

**Endpoint URL:**
```
PUT /settings/expanses/:userId/:rateCode
```

**Request data:**

```json
{
  "currencyCode": "USD"
}
```

Headers
```
content-type: application/json
authorization: ...
```


## Mockups

![Expanses settings page](./mockups/page.png?raw=true "Expanses settings page")
![Popup box after tapping the button](./mockups/confirm_box.png?raw=true "Popup box after tapping the button")
![When success](./mockups/success.png?raw=true "When success")
![When error](./mockups/error.png?raw=true "When error")

## Test scenarios


| Lp. | Test type | Name | Preconditions | Steps to perform the test | The expected result |
| --- | --- | --- | --- | --- | --- |
| 1. | unit test | Get exchange rates from NBP | Application is connected with Internet |   1. Go to page ExpanseSettingsPage  2. Page is loading all exchange rates and displays them | Page displays the available exchange rates
| 2. | unit test | Save settings - default exchange rate | User is logged |   1. Go to page ExpanseSettingsPage  2. Page is loading all exchange rates and displays them  3. The user selects a new default exchange rate for settling the delegation 4. User tap the save button 5. Page is showing the status of the operation | Page is showing the status of the operation