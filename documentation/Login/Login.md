## IDEMIA2019-1 Login

### 1. Sequence Diagram

@startuml
"Client"->"AuthController":authenticateMe(AuthenticationData authData)
"AuthController"->AuthService:getAuthenticationToken(AuthenticationData authData)
AuthService-->"AuthController":AuthenticationToken token
"AuthController"-->Client:AuthenticationToken token
@enduml

### 2. Technical and functional description

#### Request:

**Endpoint URL:** POST /auth

**Media type:** application/json

**Data type:** AuthenticationData

**Example data:**

```json
{
    "login": "tomek",
    "password": "test"
}
```



#### Successful response:

**Status code:** 200

**Media type:** application/json

**Data type:** AuthenticationToken

**Example data:**

```json
{
    "token": "token"
}
```



#### Possible errors:

- Status code 400 if the operation fails + error message in response body

###  3. Mockups
#### Browser
![Browser mockup](./Mockups/login_website.png?raw=true "Browser mockup")
#### Mobile
![Mobile mockup](./Mockups/login_mobile.png?raw=true "Mobile mockup")

### 4. Test cases
| Lp. | Test type | Name | Initial requirements | Users actions and objectives | Expected Outcome |
| --- | --- | --- | --- | --- | --- |
|1.| manual | Correct login attempt | 1. User account exists | 1. User enters correct username 2. User enters correct password 3. User clicks "login" button | Navigation to user page after logging |
|2.| manual | Incorrect login attempt - username | None | 1. User enters incorrect username 2. User enters correct password 3. User clicks "login" button | Error message: Incorrect username and/or password |
|3.| manual | Incorrect login attempt - password | 1. User account exists | 1. User enters correct username 2. User enters incorrect password 3. User clicks "login" button  | Error message: Incorrect username and/or password |
|4.| manual | Empty username field | None | 1. User enters password | "Login" button blocked |
|5.| manual | Empty password field | None | 1. User enters username | "Login" button blocked |


