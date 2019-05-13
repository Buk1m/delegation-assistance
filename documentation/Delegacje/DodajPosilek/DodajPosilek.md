## IDEMIA2019-189 Dodanie śniadania, obiadu, kolacji do delegacji

### 1. Diagram sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBEoKpDAz6rSqdDIKrFBCdCpmjEBIhBJ4wrgWvm377sg5KeBKX9B4drJKtCqT3amb26h3CejI2_EBCalwZIAZsr124EreUf29kb216YhIfEB4kbbWswTf3mi09vrwKadyiXDIy554m0)

### 2. Opis techniczno-funckjonalny
Funkcjonalność ta ma za zadanie umożliwić użytkownikowi dodawanie posiłków zjedzonych podczas delegacji.
Backend został zaimplementowany w taki sposób że przyjmuje jedynie dane, które po prostu zapisuje(nie występuje dodawanie/odejmowanie). 
Jedyne wymagania jake na dane są nałożone to muszą należeć do przedziału `<0, {ilosc_dni_delegacji}>`, jeśli nie będą ich spełniać
ustawiona zostanie domyślna wartość tj. najbliższa dopuszczalna wartość.
### Zapytanie

**Wymagana rola:** EMPLOYEE

**Wymagane nagłówki:** Authorization

**Endpoint URL:** PATCH /delegations/{delegationId}/meals

**Typ nośnika:** application/json

**Typ danych:** DelegationDto

**Przykładowe dane**
```json
{
  "version": "1",
  "lunches": "5"
}
```

```json
{
  "version": "1",
  "dinners": "1"
}
```

```json
{
  "version": "1",
  "breakfasts": "5"
}
```

`breakfasts`: opcjonalne pole(domyślna wartość: tyle ile dni trwa delegacja), jeśli wartość przekracza ilość dni delegacji, ustawiana jest wartość dni delegacji, jeśli wartość jest ujemna ustawiamy 0
`lunches`: opcjonalne pole(domyślna wartość: tyle ile dni trwa delegacja), jeśli wartość przekracza ilość dni delegacji, ustawiana jest wartość dni delegacji, jeśli wartość jest ujemna ustawiamy 0
`dinners`: opcjonalne pole(domyślna wartość: tyle ile dni trwa delegacja), jeśli wartość przekracza ilość dni delegacji, ustawiana jest wartość dni delegacji, jeśli wartość jest ujemna ustawiamy 0

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** DelegationDto

**Przykładowe dane:**

```json
{
  "version": "1",
  "breakfasts": "10",
  "lunches": "5",
  "dinners": "0"
}
```

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny

#### Możliwe kody błędów:
- `delegation-not-found` jeśli delegacja nie zostanie znaleziona

### 3. Mockupy

#### Przeglądarka i systemy mobilne
![mockup](./mockupy/Meals.png?raw=true "mockup")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                 | Warunki wstępne                                                                              | Kroki wykonania                                                                                                                                                                                                                                                     | Oczekiwany rezultat                                                                        |
| --- | --------- | ------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1.  | E2E       | Dodanie śniadania               | Użytkownik posiada delegację do której chce dodać śniadanie     | 1. Użytkownik kilka przycisk "+" obok pola z napisem "breakfast" | Zwiększenie o 1 liczby śniadań |
| 2.  | E2E       | Dodanie obiadu      | Użytkownik posiada delegację do której chce dodać obiad     | 1. Użytkownik kilka przycisk "+" obok pola z napisem "lunch" | Zwiększenie o 1 liczby obiadów |
| 3.  | E2E       | Dodanie kolacji     | Użytkownik posiada delegację do której chce dodać kolację     | 1. Użytkownik kilka przycisk "+" obok pola z napisem "dinner" | Zwiększenie o 1 liczby kolacji |
| 4.  | E2E       | Usunięcie śniadania      | Użytkownik posiada delegację z której chce usunąć śniadanie | 1. Użytkownik kilka przycisk "-" obok pola z napisem "breakfast" | Zmniejszenie o 1 liczby śniadań |
| 5.  | E2E       | Usunięcie obiadu    | Użytkownik posiada delegację z której chce usunąć obiad | 1. Użytkownik kilka przycisk "-" obok pola z napisem "lunch" | Zmniejszenie o 1 liczby obiadów |
| 6.  | E2E       | Usunięcie kolacji | Użytkownik posiada delegację z której chce usunąć kolację | 1. Użytkownik kilka przycisk "-" obok pola z napisem "dinner" | Zmniejszenie o 1 liczby kolacji |
