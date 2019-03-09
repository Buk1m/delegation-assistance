# View Checklist Docs

## Table of contents
- [Sequence Diagram](#sequence-diagram)
- [API](#api)
    - [Endpoint URL](#endpoint-url)
    - [Request data](#request-data)
    - [Response](#response-data)
- [Mockups](#page-mockups)
- [Mobile mockups](#mobile-mockups)
- [Test Scenario](#test-cases)

<a name="sequence-diagram"></a>
## Sequence Diagram

@startuml
Client->ChecklistService:{Get} getChecklist()
ChecklistService->ChecklistRepository:getChecklistByDelegationId()
database db
ChecklistRepository->db:query
db-->ChecklistRepository:entities
ChecklistRepository-->ChecklistService:Checklist
ChecklistService-->Client:ChecklistDTO
@enduml

<a name="api"></a>
## API
<a name="endpoint-url"></a>
### Endpoint URL:
`/delegations/:delegationId/checklist`

<a name="request-data"></a>
### Request data:
Method: **GET**  

<a name="response-data"></a>
### Response data:
`ChecklistDTO`:
```json5
{
  "checklistName": "TODO checklist",
  "tasks": [
    {
      "taskText": "Buy bread",
      "isDone": false
    },
    {
      "taskText": "Sell PC",
      "isDone": true
    }
  ]
}
```
OR

`ApiError`:
```json5
{
  "Message": "Something went wrong",
  "SubErrors": [
    {
      "Message": "More errors"
    }
  ]
}
```

#### Error response codes:
* __Http (400)__
* __Http (404)__
* __Http (500)__

<a name="page-mockups"></a>
## Page Mockups

### Checklist:
![Form checklist mockup](./mockups/checklist.png?raw=true "Checklist form")

<a name="mobile-mockups"></a>
## Mobile mockups

### Mobile checklist:
![Mobile checklist mockup](./mockups/mobile-checklist.png?raw=true "Mobile checklist form")



<a name="test-cases"></a>
## Test Scenario:

| Lp. | Test type | Name | Initial requirements | Users actions and objectives | Expected Outcome |
| --- | --- | --- | --- | --- | --- |
| 1. | unit | Displaying delegation checklist  |  List of tasks contains elements  |   1. Open checklist view or page | Number of rendered elements is equal to list of tasks length
| 2. | unit | Displaying delegation checklist with completed and uncompleted tasks |   1.  List of tasks contains completed elements 2.  List of tasks contains uncompleted elements |   1. Open checklist view or page | Checkboxes of completed tasks are checked and checkboxes of uncompleted tasks are unchecked. Number of rendered checked and unchecked elements is equal to coresponding elements in list of tasks.
| 3. | unit | Displaying empty delegation checklist |   1. List of tasks is empty |   1. Open checklist view or page | Component displays message that the list doesn't contain any tasks.


`Based on:` [Przypadki testowe. Planowanie przebiegu testów.](https://bulldogjob.pl/articles/244-przypadki-testowe-planowanie-przebiegu-testow) 
