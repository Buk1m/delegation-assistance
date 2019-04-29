Stworzenie nowej delegacji - dokumentacja

## Spis treści
- [Diagram sekwencyjny](#sequence-diagram)
- [API](#api)
    - [Endpoint URL](#endpoint-url)
    - [Żądanie danych](#request-data)
    - [Odpowiedzi](#response)
- [Mockupy](#mockups)
    - [Wyszukiwarka](#browser)
    - [Wyszukiwarka - błędy](#browser-error)
    - [Systemy mobilne](#mobile)
    - [Systemy mobilne - błędy](#mobile-error)
- [Przypadki testowe](#test-cases)


<a name="sequence-diagram"></a>
## Diagram sekwencyjny
@startuml
Client->DelegationService:{Post} saveDelegation()
DelegationService->DelegationRepository:saveDelegation()
database db
DelegationRepository->db:query
db-->DelegationRepository:entities
DelegationRepository-->DelegationService:Delegation
DelegationService-->Client:status
@enduml


<a name="api"></a>
## API

<a name="endpoint-url"></a>
### Endpoint URL:
_(Post)_ `/delegations`

<a name="request-data"></a>
### Żądanie danych
(application/json)
```json5
{
	"startDate": "1998-02-03T01:01:01",
    "endDate": "1998-03-03T01:01:02",
    "countryId": 1,
    "diet": {
        "perDiem": 50,
        "currency": "PLN"
    },
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice"
}

```
* `startDate`: wymagane pole, format: `yyyy-MM-dd'T'HH:mm:ss`
* `endDate`: wymagane pole, `endDate > startDate`, format `yyyy-MM-dd'T'HH:mm:ss`
* `countryId`: wymagane pole
* `diet`: wymagane pole
* `diet.perDiem`: wymagane pole
* `diet.currency`: wymagane pole, musi byc istniejaca waluta
* `destinationLocation`: wymagane pole
*  `delegationObjective`: wymagane pole

#### Dodatkowe informacje
Informacje o użytkowniku, wyciągane są z JWT tokenu
Delegacja jest tworzona ze statusem `CREATED`

##### Lista statusów:
1. `CREATED` - delegacja została stworzona, ale jeszcze nie została w całości przygotowana, delegacja jest tworzona z tym statusem
2. `PREPARED` - delegacja została przygotowana i czeka na potwierdzona travel managera
3.  `NEEDS_WORK` - delegacja została cofnięta przez `Travel managera`, `Approvera` lub `Accountant` i wymaga dodatkowych poprawek
3. `CHECKED` - delegacja została potwierdzona przez travel managera
4. `APPROVED` - delegacja dostała approve oosby z zarządu
5. `FINALIZED` - osoba dostała approve od księgowego, ostateczny status

<a name="response"></a>
### Odpowiedzi:
__Http (200)__
```json5
{
    "id": 1,
    "version": 2,
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "countryId": 1,
    "diet": {
        "perDiem": 50,
        "currency": "PLN"
    },
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED",
    "user": {
      "id": 1,
      "login": "amalysz",
      "firstName": "Adam",
      "lastName": "Małysz",
      "avatar": {base64}
    }
}
```
#### Kody błędów:
- Status code _401_ jeśli użytkownik jest nie zalogowany
- Status code _403_ jeśli uzytkownik nie ma uprawnień
- Status code _400_ jeśli body nie jest poprawne



<a name="mockups"></a>
##Mockupy

<a name="browser"></a>
### Wyszukiwarka
![Browser mockup](mockups/web.png?raw=true "Browser")

<a name="country-list"></a>
##Lista krajów przy wybieraniu kraju delegacji
![Browser error](mockups/webCountries.png?raw=true "Browser Error")

<a name="browser-error"></a>
##Wyszukiwarka - błędy
![Browser error](mockups/webError.png?raw=true "Browser Error")

<a name="mobile"></a>
##Systemy mobilne
![Mobile](mockups/mobile.png?raw=true "Mobile")

<a name="mobile-error"></a>
##Systemy mobilne - błędy
![Mobile error](mockups/mobileError.png?raw=true "Mobile Error")

<a name="test-cases"></a>
## Przypadki testowe

| Lp. | Typ testu | Nazwa | Warunki wstępne | Kroki wykonania |Oczekiwany rezultat |
| --- | --- | --- | --- | --- | --- |
1	|jednostkowy   	|Stworzenie nowej delegacji. |	Użytkownik jest zalogowany w systemie.	| 1.) Użytkownik wprowadza nazwę kraju w pole “Country”. <br>2.) Użytkownik wprowadza nazwę miasta w pole “City”.<br>3.) Użytkownik wprowadza cel delegacji w pole “Destinantion”.<br>4.) Użytkownik wybiera datę rozpoczęcia delegacji w polu “From”.<br>5.) Użytkownik wybiera datę zakończenia delegacji w polu “To”.<br>6.) Użytkownik naciska przycisk “Create delegation” | Delegacja została dodana do repozytorium delegacji. Liczba pozycji w repozytorium zwiększyła się o 1.)
2	|jednostkowy	|Próba stworzenia delegacji bez wybrania kraju. | Użytkownik jest zalogowany w systemie. |1.) Użytkownik wprowadza nazwę miasta w pole “City”.<br>2.) Użytkownik wprowadza cel delegacji w pole “Destinantion”.<br>3.) Użytkownik wybiera datę rozpoczęcia delegacji w polu “From”.<br>4.) Użytkownik wybiera datę zakończenia delegacji w polu “To”.<br>5.) Użytkownik naciska przycisk “Create delegation”	| Na ekranie pojawia się komunikat o obligatoryjności pola “Country”. Delegacja nie została utworzona. Pole “Country” zostało wyczyszczone. Pozostałe pola nie zostały wyczyszczone.
3	|jednostkowy	|Próba stworzenia delegacji bez wybrania miasta.|Użytkownik jest zalogowany w systemie. |1.) Użytkownik wprowadza nazwę miasta w pole “Country”.<br>2.) Użytkownik wprowadza cel delegacji w pole “Destinantion”.<br>3.) Użytkownik wybiera datę rozpoczęcia delegacji w polu “From”.<br>4.) Użytkownik wybiera datę zakończenia delegacji w polu “To”.<br>5.) Użytkownik naciska przycisk “Create delegation”	| Na ekranie pojawia się komunikat o obligatoryjności pola “City”. Delegacja nie została utworzona. Pole “City” zostało wyczyszczone. Pozostałe pola nie zostały wyczyszczone.
4	|jednostkowy|	Próba stworzenia delegacji bez wybrania czasu rozpoczęcia.|Użytkownik jest zalogowany w systemie.|1.) Użytkownik wprowadza nazwę miasta w pole “Country”.<br> 2.) Użytkownik wprowadza nazwę miasta w pole “City”.<br>3.) Użytkownik wprowadza cel delegacji w pole “Destinantion”.<br>4.) Użytkownik wybiera datę zakończenia delegacji w polu “To”.<br>5.) Użytkownik naciska przycisk “Create delegation” |Na ekranie pojawia się komunikat o obligatoryjności pola “From”. Delegacja nie została utworzona. Wyczyszczone zostaje pole “From”. Pozostałe pola nie zostały wyczyszczone.
5	|jednostkowy| Próba stworzenia delegacji bez wybrania czasu zakończenia. | Użytkownik jest zalogowany w systemie. |1.) Użytkownik wprowadza nazwę miasta w pole “Country”.<br>2.) Użytkownik wprowadza nazwę miasta w pole “City”.<br>3.) Użytkownik wprowadza cel delegacji w pole “Destinantion”.<br>4.) Użytkownik wybiera datę rozpoczęcia  delegacji w polu “From”.<br>5.) Użytkownik naciska przycisk “Create delegation” | Na ekranie pojawia się komunikat o obligatoryjności pola “To”. Delegacja nie została utworzona. Wyczyszczone zostaje pole “To”. Pozostałe pola nie zostały wyczyszczone.
6	|jednostkowy |Próba stworzenia delegacji bez wybrania celu podróży. |	Użytkownik jest zalogowany w systemie. |1.) Użytkownik wprowadza nazwę miasta w pole “Country”. <br>2.) Użytkownik wprowadza nazwę miasta w pole “City”.<br>3.) Użytkownik wybiera datę rozpoczęcia  delegacji w polu “From”.<br>4.) Użytkownik wybiera datę zakończenia delegacji w polu “To”.<br>5.) Użytkownik naciska przycisk “Create delegation”	| Na ekranie pojawia się komunikat o obligatoryjności pola “Destination”. Delegacja nie została utworzona. Wyczyszczone zostaje pole “Destination”. Pozostałe pola nie zostały wyczyszczone.
7       |jednostkowy |	Próba ustawienia czasu zakończenia delegacji na datę wcześniejszą, niż rozpoczęcie delegacji.	|Użytkownik jest zalogowany w systemie. |1.) Użytkownik wprowadza nazwę kraju w pole “Country”.<br>2.) Użytkownik wprowadza nazwę miasta w pole “City”.<br>3.) Użytkownik wprowadza cel delegacji w pole “Destinantion”.<br>4.) Użytkownik wybiera datę rozpoczęcia delegacji w polu “From”.<br>5.) Użytkownik wybiera datę zakończenia delegacji w polu “To”, która jest wcześniejsza niż data w polu “From”. <br>6.) Użytkownik naciska przycisk “Create delegation" | Na ekranie pojawia się komunikat o niemożliwości utworzenia delegacji, kiedy data zakończenia jest wcześniejsza niż data rozpoczęcia. Delegacja nie została utworzona. Wyczyszczone zostają pola “From” i “To”. Pozostałe pola nie zostały wyczyszczone.

`Based on:` [Przypadki testowe. Planowanie przebiegu testów.](https://bulldogjob.pl/articles/244-przypadki-testowe-planowanie-przebiegu-testow) 

