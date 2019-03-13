# Send delegation to travel manager to accept

### 1. Sequence Diagram

@startuml SendDelegationToTravelManagerToAccept
Client->DelegationService:{Post} sendDelegationToTravelManager()
DelegationService->DelegationRepository:assignDelegationToTravelManager()
database db
DelegationRepository->db:query
db-->DelegationRepository:entities
DelegationRepository-->DelegationService:Delegation
DelegationService-->Client:DelegationDTO
@enduml

### 2. API

##### Endpoint

**Endpoint URL:** POST `/delegations/sendToTravelManager`
**Required headers:** Authorization
**Query parameters:** none
**Body parameters**:

- _id_ - (`required`) the id of delegation, which is sending to travel manager to accept

##### Successful response

**Status code:** 200
**Media type:** application/json
**Data:** data of sent delegation

```json
{
  "startDate": "2019-03-09 9:30",
  "endDate": "2019-03-23 12:05",
  "destinationCountryISO3": "BFA",
  "destinationLocation": "Radom",
  "delegationObjective": "Buy high quality rice",
  "status": WAITING_FOR_APPROVE
}
```

##### Possible errors:

- Status code _401_ if the user is not authenticated
- Status code _403_ if the user does not have permission
- Status code _400_ if the body includes invalid values + error message in body of response

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
| 1.  | manual    | Send delegation to accept to travel manager                              | 1. User should have at least 1 delegation       | 1. Click "send" button       | Delegation is sent to travel manager to accept                  |
| 2 . | manual    | Send delegation to accept to travel manager without header Authorization | 1. User should have at least 1 delegation       | 1. Click "send" button       | Error message - user is not authorized                          |
| 3.  | manual    | Send other user delegation to accept to travel manager                   | 1. Other user should have at least 1 delegation | 1. Click "send" button       | Error message - user has no permissions to send this delegation |
| 4.  | manual    | Send non-existing delegation to accept to travel manager                 | 1. Sending delegation doesn't exists            | 1. Click "send" button       | Error message - sending non-existing delegation                 |
