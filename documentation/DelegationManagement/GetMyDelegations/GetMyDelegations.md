## IDEMIA2019-2 GetMyDelegations

### 1. Sequence Diagram

@startuml
"Client"->"DelegationController":getMyDelegations(Timestamp from, Timestamp to, String status)
alt filtering by date and status
    "DelegationController"->DelegationService:getDelegationsByUserId(Long userId, Timestamp from, Timestamp to, String status)
    database DB
    DelegationService->DB:query
    DB-->DelegationService:result
    DelegationService-->"DelegationController":Iterable<Delegation> delegations
else filtering by date
    "DelegationController"->DelegationService:getDelegationsByUserId(Long userId, Timestamp from, Timestamp to)
    DelegationService->DB:query
    DB-->DelegationService:result
    DelegationService-->"DelegationController":Iterable<Delegation> delegations
else flitering by status
    "DelegationController"->DelegationService:getDelegationsByUserId(Long userId, String status)
    DelegationService->DB:query
    DB-->DelegationService:result
    DelegationService-->"DelegationController":Iterable<Delegation> delegations
else without filtering - all delegations
    "DelegationController"->DelegationService:getDelegationsByUserId(Long userId)
    DelegationService->DB:query
    DB-->DelegationService:result
    DelegationService-->"DelegationController":Iterable<Delegation> delegations
end
"DelegationController"-->Client:Iterable<DelegationDTO> delegationDtos
@enduml

### 2. Technical and functional description

#### Request:

**Endpoint URL:** GET /delegations/my

**Required headers:** Authorization

**Query parameters:**

- **from** - the date from which we get the delegations **DEFAULT** null or 0 if **to** is specified
- **to** - the date to which we get the delegations **DEFAULT** null or current date if **from** is specified
- **status**  - the status of the delegations **DEFAULT** null



#### Successful response:

**Status code:** 200

**Media type:** application/json

**Data:** array of DelegationDto

**Example:**

```json
[
    {
       "startDate": "2019-03-09 9:30",
       "endDate": "2019-03-23 12:05",
       "destinationCountryISO3": "BFA",
       "destinationLocation": "Radom",
       "delegationObjective": "Buy high quality rice",
       "status": COMPLETED
	},
    {
       "startDate": "2019-02-09 9:30",
       "endDate": "2019-02-23 12:05",
       "destinationCountryISO3": "BFA",
       "destinationLocation": "Radom",
       "delegationObjective": "Buy high quality rice",
       "status": COMPLETED
	},
]
```



#### Possible errors:

- Status code 401 if the user is not authenticated
- Status code 403 if the user does not have permission
- Status code 400 if the query parameters contain invalid values + error message in response body

###  3. Mockups
#### Browser
![Browser mockup](./Mockups/Delegations_website.png?raw=true "Browser mockup")
#### Mobile
![Mobile mockup](./Mockups/Delegations_mobile.png?raw=true "Mobile mockup")

### 4. Test cases
| Lp. | Test type | Name | Initial requirements | Users actions and objectives | Expected Outcome |
| --- | --- | --- | --- | --- | --- |
|1.| manual | Show all delegations | 1. User should have at least 1 delegation |  1. Click "show" button | All user's delegations are listed |
|2 .| manual | Show delegations in date range | 1. User should have at least 2 delegation | 1. Select date range (user have at least 1 delegation in that range and at least 1 delegation beyond that range)| 1. User's delegations from date range are listed 2. User's delegations beyond date range are not listed |
|3.| manual | Rejecting invalid dates | None | 1. Select date "From" 2. Select date "To" erlier than "From". |  Error message under date picker |
|4. | manual | Columns sorting | List of delegations should have at least 2 elements | 1. Click triangle next to column name | Table should be sorted by that column |
