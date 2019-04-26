## IDEMIA2019-10 Szczegóły delegacji

### 1. Diagram Sekwencji

### 2. Opis techniczny i funkcjonalny
#### 2.1 Wyświetlanie

Opisana checklista oraz wydatki pobierane są z gotowych endpoint'ów wymienionych poniżej. 

**Przykład odpowiedzi:**

**Szczegóły delegacji**

**Endpoint URL:** GET /delegations/{delegation_id}
- delegation_id: ID delegacji
```json
[
  {
    "version": 4,
    "delegationID": 1,
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "destinationCountryISO3": "BFA",
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED"
  }
]
```

**Wydatki**

**Endpoint URL:** GET /delegations/{delegation_id}/expenses

- delegation_id: ID delegacji
```json
{
  "totalSize": 12,
  "data": [
    {
      "id": 1,
      "version": 1,
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
      "version": 2,
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

**Checklista**

**Endpoint URL:** GET /delegations/{delegationId}/checklist

- delegationId: ID delegacji
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
### 3. Mockupy

#### Web
![Browser mockup](mockups/DelegationDetails-web.png?raw=true "Browser")

#### Mobile
![Mobile mockup](mockups/DelegationDetails-mobile.png?raw=true "Mobile")

### 4. Test cases