 Create Delegation Docs

## Table of contents
- [Sequence Diagram](#sequence-diagram)
- [API](#api)
    - [Endpoint URL](#endpoint-url)
    - [Request data](#request-data)
    - [Response](#response)
- [Mockups](#mockups)
    - [Browser mockup](#browser)
    - [Browser error](#browser-error)
    - [Mobile mockup](#mobile)
    - [Mobile error](#mobile-error)
- [Test cases](#test-cases)


<a name="sequence-diagram"></a>
## Sequence Diagram
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
### Request data:
(application/json)
```json5
{
   "startDate": "2019-03-09 9:30",
   "endDate": "2019-03-23 12:05",
   "destinationCountryISO3": "BFA",
   "destinationLocation": "Radom",
   "delegationObjective": "Buy high quality rice"
}
```
* `startDate`: wymagane pole, format: `yyyy-MM-dd'T'HH:mm:ss`
* `endDate`: wymagane pole, `endDate > startDate`, format `yyyy-MM-dd'T'HH:mm:ss`
* `destinationCountryISO`: wymagane pole, musi mieć długość 3 znaków
* `destinationLocation`: wymagane pole
*  `delegationObjective`: wymagane pole

#### Additional info
Informacje o użytkowniku, wyciągane są z JWT tokenu
Delegacja jest tworzona ze statusem `CREATED`

##### Lista statusów:
1. `CREATED` - delegacja została stworzona, ale jeszcze nie została w całości przygotowana, delegacja jest tworzona z tym statusem
2. `PREPARED` - delegacja została przygotowana i czeka na potwierdzona travel managera
3. `TRAVEL_MANGER_APPROVED` - delegacja została potwierdzona przez travel managera
4. `APPROVER_APPROVED` - delegacja dostała approve oosby z zarządu
5. `RATIFIED` - osoba dostała approve od księgowego, ostateczny status

<a name="response"></a>
### Response:
__Http (201)__

#### Error response codes:
* __Http (400)__
* __Http (401)__
* __Http (403)__

<a name="mockups"></a>
##Page Mocups

<a name="browser"></a>
### Browser
![Browser mockup](mockups/web.png?raw=true "Browser")

<a name="country-list"></a>
##Country List
![Browser error](mockups/webCountries.png?raw=true "Browser Error")

<a name="browser-error"></a>
##Browser Error
![Browser error](mockups/webError.png?raw=true "Browser Error")

<a name="mobile"></a>
##Mobile
![Mobile](mockups/mobile.png?raw=true "Mobile")

<a name="mobile-error"></a>
##Mobile Error
![Mobile error](mockups/mobileError.png?raw=true "Mobile Error")

<a name="test-cases"></a>
## Test cases:

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

