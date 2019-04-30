## IDEMIA2019-1 Login

### 1. Diagram sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/RKz12i8m4Bpd5I4d2-O3HK9BFNgh7mZjKXVZhYJR-dqJAcZLox8pm-pED4bybFaMbEa20ecnphIpN3ecYHm2H5FxZBE4WnVOjM-0J4SlNXUzB9NwjbfNY1xYWWDix_GIaIOTU4BQwnUw-vGU7CTAVVZidqWdJ79OJKvd4jBlR-lMIlKsyfclG5hAL0tGcCi_0G00)

### 2. Opis techniczno-funckjonalny

#### Zapytanie:

**Wymagana rola:** -

**Wymagane nagłówki:** -

**Endpoint URL:** POST /auth

**Query:** -

**Typ nośnika:** application/json

**Typ danych:** AuthenticationData

**Przykładowe dane:**

```json
{
  "login": "tomek",
  "password": "test"
}
```

`login`: wymagane pole
`password`: wymagane pole

#### Dodatkowe informacje

-

#### Prawidłowa odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** AuthenticationToken

**Przykładowa odpowiedź:**

```json
{
  "token": "token"
}
```

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `400` jeśli typ danych w body/query jest niepoprawny
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- incorrect-credentials - jeśli nazwa użytkownika lub hasło są nieprawidłowe

### 3. Mockupy

#### Przeglądarka

![Browser mockup](./mockupy/login_website.png?raw=true "Browser mockup")

#### Systemy mobilne

![Mobile mockup](./mockupy/login_mobile.png?raw=true "Mobile mockup")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                            | Warunki wstępne             | Kroki wykonania                                                                                                                  | Oczekiwany rezultat                                             |
| --- | --------- | ------------------------------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1.  | E2E       | Poprawne logowanie                               | 1. Użytkownik posiada konto | 1. Użytkownik podaje poprawną nazwę użytkownika<br>2. Użytkownik podaje poprawne hasło<br>3. Użytkownik klika przycisk logowania | Przekierowanie do strony użytkownika                            |
| 2.  | E2E       | Niepoprawne logowanie - błędna nazwa użytkownika | Brak                        | 1. Użytkownik podaje błędną nazwę użytkownika<br>2. Użytkownik podaje poprawne hasło<br>3. Użytkownik klika przycisk logowania   | Wyświetlenie informacji o niepoprawnym loginie lub haśle        |
| 3.  | E2E       | Niepoprawne logowanie - błędne hasło             | 1. Użytkownik posiada konto | 1. Użytkownik podaje poprawną nazwę użytkownika<br>2. Użytkownik podaje błędne hasło<br>3. Użytkownik klika przycisk logowania   | Wyświetlenie informacji o niepoprawnym loginie lub haśle        |
| 4.  | E2E       | Puste pole nazwy użytkownika                     | Brak                        | 1. Użytkownik podaje poprawne hasło<br>2. Użytkownik klika przycisk logowania                                                    | Wyświetlenie informacji iż pole nazwy użytkownika jest wymagane |
| 5.  | E2E       | Puste pole hasła                                 | Brak                        | 1. Użytkownik podaje poprawną nazwę użytkownika<br>2. Użytkownik klika przycisk logowania                                        | Wyświetlenie informacji iż pole nazwy użytkownika jest wymagane |
