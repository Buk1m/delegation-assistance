# Send delegation to travel manager to accept

### 1. Sequence Diagram

@startuml SendDelegationToTravelManagerToAccept
Client->DelegationService:{PATCH} patchDelegation()
DelegationService->DelegationPatchStrategyContext:validateDelegationPatch()
DelegationPatchStrategyContext->DelegationService:Delegation
DelegationService->DelegationRepository:save()
DelegationRepository-->DelegationService:Delegation
DelegationService-->Client:result
@enduml

### 2. API

##### Endpoint

**Endpoint URL:** PATCH `/delegations/{delegationId}`

**Required headers:** Authorization

**Dostępny dla ról:** TRAVEL_MANAGER, APPROVER, ACCOUNTANT, EMPLOYEE

**Request data:**
(application/json)
```json5
{
  "delegationStatus": "PREPARED"
}
```

`delegationStatus` - pole to jest wymagane, powinno być przekazywane jako `string`, [lista możliwych statusów](../../DelegationManagement/CreateDelegation/CreateDelegationTechnicalDesign.md).
    
`Employee` moze ustawic nastepujace statusy:
* `PREPARED`
* `CREATED`
##### Successful response

**Status code:** 200

**Media type:** application/json

##### Possible errors:

- Status code _401_ jeśli użytkownik jest nie zalogowany
- Status code _403_ jeśli uzytkownik nie ma uprawnień
- Status code _400_ jeśli body nie jest poprawne

### 3. Mockups

##### Page

![Page](./mockups/page.png?raw=true "Page")

##### Error

![Error](./mockups/error.png?raw=true "Error")

##### Success

![Success](./mockups/success.png?raw=true "Success")

### 4. Test cases

| Lp. | Test type | Name                                                                     | Initial requirements                            | Users actions and objectives | Expected Outcome                                                |
| --- | --------- | ------------------------------------------------------------------------ | ----------------------------------------------- | ---------------------------- | --------------------------------------------------------------- |
| 1.  | manual    | Wysłąnie delegacji do travel manager                            | 1. Uzytkownik ma przynajmniej jedna delegacje       | 1. Naciska przycisk "Send"    | Delegacja zostałą wysłana do travel manager                  |
| 2 . | manual    | Send delegation to accept to travel manager without header Authorization | 1. Uzytkownik ma przynajmniej jedna delegacje | 1. Naciska przycisk "Send" | Uzytkowni nie jest autoryzowany                          |
