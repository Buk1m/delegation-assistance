## IDEMIA2019-26 Jako użytkownik mogę pobrać raport

### 1. Diagram Sekwencji

!["sequence diagram"](https://www.plantuml.com/plantuml/svg/bP512i8m44NNxIb2Lmhc0YwAe0Y2WbWla9flZQI9JAQAdjvMnGZMXTitapSpFvF0YhYfhLZxqe1kAt_431QLsXsH9jdK6ZZEP9uzAHllfjunUMj1sRW2Rt3on8EbTvNGxwQ57ec2oRIG7WtRwmd3rjZhaNd41UXiTkZK4VutH2jMfGeGUsCHhe5HfydN19b_rECbyvQbIQp8lkK8eR7S9_qPLMSK5yE7rwu_iv3vC_Nl5nCutNxM7G00)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** EMPLOYEE (tylko swoje), TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations/{delegation_id}/report?reportType={reportType}

- **delegation_id** - id delegacji, do której raport pobieramy

**Query:**

- **reportType** - enum (PDF, XLSX) **wymagany**

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/pdf _lub_ application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

**Typ danych:** plik raportu

**Przykładowe dane:** -

#### Możliwe błędy:

- Status `500` jeśli wystąpi nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik nie jest zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli operacja się nie powiedzie ze znanego powodu + kod błędu w ciele odpowiedzi

#### Możliwe kody błędów:

- report-generation-not-allowed - jeśli delegacja posiada nieodpowiedni status (CREATED lub NEEDS_WORK)
- report-generation-problem - jeśli wystąpi problem podczas generowania pliku z raportem

### 3. Mockupy

![Przycisk](mockupy/btn.png?raw=true "Przycisk")

### 4. Test cases

| Lp. | Typ testu | Nazwa                   | Warunki wstępne                                 | Kroki wykonania                                                                                                           | Oczekiwany rezultat    |
| --- | --------- | ----------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1.  | E2E       | Pobranie raportu w PDF  | Użytkownik jest zalogowany, musi mieć delegację | 1. Użytkownik przechodzi do strony raportu 2. Wybiera format PDF z menu wyboru oraz naciska przycisk do pobrania raportu  | Raport zostaje pobrany |
| 2.  | E2E       | Pobranie raportu w XLSX | Użytkownik jest zalogowany, musi mieć delegację | 1. Użytkownik przechodzi do strony raportu 2. Wybiera format XLSX z menu wyboru oraz naciska przycisk do pobrania raportu | Raport zostaje pobrany |
