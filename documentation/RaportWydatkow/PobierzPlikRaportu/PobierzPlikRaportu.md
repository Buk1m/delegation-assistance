## IDEMIA2019-26 GetDelegations

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/nL9DJuGm5BppAruuiGdy0MB81bUJJJniLlz0iHFIM5ji7oh-UeiGu53YmOCzz6FoElFcPOwUXUF-LTF5DWhkwwBLorLqDe19UgiL3AT5bPwWqGfMrZp2lQjdfAMq7qPR8QyOgxFfU1ewa5kkEJrOqv9SVf_b8Q6m8eH5jM8ZcLTitL2su1NFTkYaOD483phLF-yOK-2loxSURfXAwc97qS7tclTvukDOeKr_V_5wzzd1UFY8v__oU6OuqMZSpBrLXBd9tuqkM71f0WrZIiozqiYYmyjfNo-dJTuuR8SafbvKKuJBKMNEPNA4aI7ntm00)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/{delegation_id}/report?reportType={reportType}

- **delegation_id** jako **Long**

**Query:**

- **reportType** - enum (CSV, XLSX, PDF) **wymagany**

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/pdf _lub_ text/csv _lub_ application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

**Typ danych:** plik raportu

**Przykładowe dane:** -

#### Dodatkowe informacje

- Delegacja musi mieć status `Prepared`<br>Delegacja musi zostać zrealizowana

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- wrong-delegation-status - kiedy delegacja posiada nieodpowiedni status
- delegation-did-not-finished - kiedy delegacje się jeszcze nie skończyła

### 3. Mockupy

#### Plik CSV

![CSV](mockupy/csv.png?raw=true "CSV")

#### Plik XLSX

![XLSX](mockupy/xlsx.png?raw=true "XLSX")

#### Plik PDF

![PDF](mockupy/pdf.png?raw=true "PDF")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                                   | Warunki wstępne                                                                               | Kroki wykonania                                                                      | Oczekiwany rezultat                                                          |
| --- | --------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| 1   | E2E       | Pobranie pliku raportu CSV.                             | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada delegację gotową do wygenerowania | Użytkownik wybiera typ pliku "CSV"<br>Użytkownik klika przycisk pobierania raportu.  | Raport w formacie CSV zostaje pobrany.                                       |
| 2   | E2E       | Pobranie pliku raportu PDF.                             | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada delegację gotową do wygenerowania | Użytkownik wybiera typ pliku "PDF"<br>Użytkownik klika przycisk pobierania raportu.  | Raport w formacie PDF zostaje pobrany.                                       |
| 3   | E2E       | Pobranie pliku raportu XLSX.                            | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada delegację gotową do wygenerowania | Użytkownik wybiera typ pliku "XLSX"<br>Użytkownik klika przycisk pobierania raportu. | Raport w formacie XLSX zostaje pobrany.                                      |
| 4   | E2E       | Pobranie pliku raportu przez użytkownika bez uprawnień. | Użytkownik jest zalogowany w systemie.                                                        | Użytkownik wybiera typ pliku<br>Użytkownik klika przycisk pobierania raportu.        | Wyświetla się komunikat o braku uprawnień.                                   |
| 5   | E2E       | Pobranie pliku reportu przed realizacją delegacji.      | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację.                       | Użytkownik wybiera typ pliku<br>Użytkownik klika przycisk pobierania raportu.        | Wyświetla się komunikat o tym że delegacja nie została jeszcze zrealizowana. |
| 6   | E2E       | Pobranie pliku reportu z błędnym statusem.              | Użytkownik jest zalogowany w systemie i posiada conajmniej 1 delegację.                       | Użytkownik wybiera typ pliku<br>Użytkownik klika przycisk pobierania raportu.        | Wyświetla się komunikat o tym że delegacja nie została zrealizowana.         |
