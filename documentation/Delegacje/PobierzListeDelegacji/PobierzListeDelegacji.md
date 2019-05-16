## IDEMIA2019-26 GetDelegations

### 1. Diagram Sekwencji

!["sequence diagram"](http://www.plantuml.com/plantuml/svg/tPNXIiD03CU_zob2FpbeNs186RDVX87YzW9f6sialPjtEMK-lRKJheuMX25C-wNqV-6VvDUaNNb5fw4JkBSLatilIQZ5-fcIz4QOZAPvaHv5PMksv5wvfdJPaaRLNstLiMap29xSnhPiCjZO6gL4fHrt19vDJQTYCCgImSXUKOC7FzmM2Oh28ulIfpbKXw-31FfhegYyYDe3xQrdjUvmMkfSji6rGSKAFK6v7fwd3Fiqw-LB87SuXgppcSIEV12TzvacUwlai1AwZcS5DB61XCJJTomDAfq7vQSlQt7XL8GZbU39_UAe_0q8A09xTDXHhvsnEN79npi-0oY3Vp9FRwnFDem_Glb0D0QUYVI2-pTDCjLMNXp_2rCEvUvkR5AgzScgDmgTV000)

### 2. Opis techniczny i funkcjonalny

#### Żądanie:

**Wymagana rola:** TRAVEL_MANAGER, APPROVER, ACCOUNTANT

**Wymagane nagłówki:** Authorization

**Endpoint URL:** GET /delegations

**Query:**

- **login** - login właściciela delegacji **Domyślna wartość** null
- **since** - data od kiedy poszukiwane są delegacje (względem `start_date`) **Domyślna wartość** null
- **until** - data do kiedy poszukiwane są delegacje (względem `start_date`) **Domyślna wartość** null
- **status** - status delegacji **Domyślna wartość** null
- **page** która strona jest pobierana **domyślna wartość** 1
- **size** rozmiar strony **domyślna wartość** 10
- **sort** pola, po których mają odbywać się sortowania `.asc` po nazwie pola oznacza sortowanie rosnąco, `.desc` po nazwie pola oznacza sortowanie malejąco **domyślna wartość** delegationId.desc **dostępne wartości** delegationId, status, delegationStartDate, delegationEndDate

**Typ nośnika:** -

**Typ danych:** -

**Przykładowe dane:** -

#### Pozytywna odpowiedź:

**Status:** 200

**Typ nośnika:** application/json

**Typ danych:** lista DelegationDto

**Przykładowe dane:**

```json
[
  {
    "id": 1,
    "version": 2,
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "destinationCountry": "Poland",
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED",
    "user": {
      "id": 1,
      "login": "amalysz",
      "firstName": "Adam",
      "lastName": "Małysz",
      "avatar": { base64 }
    }
  },
  {
    "id": 2,
    "version": 10,
    "startDate": "2019-01-01T10:19:19",
    "endDate": "2019-02-01T10:19:19",
    "destinationCountry": "Poland",
    "destinationLocation": "Radom",
    "delegationObjective": "Buy high quality rice",
    "status": "CREATED",
    "user": {
      "id": 1,
      "login": "amalysz",
      "firstName": "Adam",
      "lastName": "Małysz",
      "avatar": { base64 }
    }
  }
]
```

#### Dodatkowe informacje

- `Kolor zielony` przy zdjęciu oznacza, że delegacja trwa.
- `Kolor szary` przyz zdjęciu oznacza, że delegacja została zakończona.

#### Możliwe błędy:

- Status `500` jeśli wystąpił nieznany błąd po stronie serwera
- Status `401` jeśli użytkownik jest nie zalogowany
- Status `403` jeśli uzytkownik nie ma uprawnień
- Status `400` jeśli typ danych w body/query jest niepoprawny

#### Możliwe kody błędów:

-

### 3. Mockupy

### Przeglądarka

![Browser mockup](mockupy/allDelegationsWeb.PNG?raw=true "Browser")

#### Systemy mobilne - filtrowanie

![MobileFiltering](mockupy/allDelegationsMobile1.PNG?raw=true "Mobile")

#### Systemy mobilne - lista delegacji

![Mobile](mockupy/allDelegationsMobileList.PNG?raw=true "Mobile List")

### 4. Test cases

| Lp. | Typ testu | Nazwa                                                                                                         | Warunki wstępne                                                                                                                  | Kroki wykonania                                                                                                                                                                                       | Oczekiwany rezultat                                                    |
| --- | --------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | E2E       | Wyświetlanie listy delegacji                                                                                  | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik klika przycisk pobierania delegacji.                                                                                                                                                    | Wyświetlenie listy delegacji                                           |
| 2   | E2E       | Wyświetlanie listy delegacji z określonym statusem.                                                           | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera status delegacji<br>2. Użytkownik klika przycisk pobierania delegacji.                                                                                                          | Wyświetlenie listy delegacji                                           |
| 3   | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy                                                      | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od" kiedy<br>2. Użytkownik klika przycisk pobierania delegacji                                                                                                            | Wyświetlenie listy delegacji                                           |
| 4   | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy                                                      | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "do" kiedy<br>2. Użytkownik klika przycisk pobierania delegacji                                                                                                            | Wyświetlenie listy delegacji                                           |
| 5   | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy                                           | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | Użytkownik wybiera datę "od" oraz "do" i klika przycisk pobierania delegacji                                                                                                                          | Wyświetlenie listy delegacji                                           |
| 6   | E2E       | Wyświetlanie listy delegacji z błędnie określonymi datami "od" i "do" kiedy (data "do" wcześniejsza niż "od") | Użytkownik jest zalogowany.                                                                                                      | 1. Użytkownik wybiera datę "od" kiedy<br>2. Użytkownik wybiera datę "do" kiedy wcześniejszą niż data "od" kiedy                                                                                       | Wyświetlenie informacji iż data "do" musi być późniejsza niż data "od" |
| 7   | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy oraz statusem                                        | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od"<br>2. Użytkownik wybiera status<br>3. Użytkownik klika przycisk pobierania delegacji.                                                                                 | Wyświetlenie listy delegacji                                           |
| 8   | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy oraz statusem                                        | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "do"<br>2. Użytkownik wybiera status<br>3. Użytkownik klika przycisk pobierania delegacji.                                                                                 | Wyświetlenie listy delegacji                                           |
| 9   | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy oraz statusem.                            | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od"<br>2. Użytkownik wybiera datę "do"<br>3. Użytkownik wybiera status<br>4. Użytkownik klika przycisk pobierania delegacji                                               | Wyświetlenie listy delegacji                                           |
| 10  | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy oraz nazwą użytkownika.                              | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od"<br>2. Użytkownik wprowadza nazwę użytkownika<br>3. Użytkownik klika przycisk pobierania delegacji                                                                     | Wyświetlenie listy delegacji                                           |
| 11  | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy oraz nazwą użytkownika.                              | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "do"<br>2. Użytkownik wprowadza nazwę użytkownika<br>3. Użytkownik klika przycisk pobierania delegacji                                                                     | Wyświetlenie listy delegacji                                           |
| 12  | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy oraz nazwą użytkownika.                   | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od"<br>2. Użytkownik wybiera datę "do"<br>3. Użytkownik wprowadza nazwę użytkownika<br>4. Użytkownik klika przycisk pobierania delegacji                                  | Wyświetlenie listy delegacji                                           |
| 13  | E2E       | Wyświetlanie listy delegacji z określoną datą "od" kiedy, nazwą użytkownika oraz statusem.                    | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "od"<br>2. Użytkownik wprowadza nazwę użytkownika<br>3. Użytkownik wybiera status<br>4. Użytkownik klika przycisk pobierania delegacji                                     | Wyświetlenie listy delegacji                                           |
| 14  | E2E       | Wyświetlanie listy delegacji z określoną datą "do" kiedy, nazwą użytkownika oraz statusem.                    | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | 1. Użytkownik wybiera datę "do"<br>2. Użytkownik wprowadza nazwę użytkownika<br>3. Użytkownik wybiera status<br>4. Użytkownik klika przycisk pobierania delegacji                                     | Wyświetlenie listy delegacji                                           |
| 15  | E2E       | Wyświetlanie listy delegacji z określonymi datami "od" i "do" kiedy, nazwą użytkownika oraz statusem.         | Użytkownik jest zalogowany w systemie<br>Użytkownik posiada uprawnienia odpowiednie uprawnienia<br>W systemie istnieją delegacje | U1. Użytkownik wybiera datę "od"<br>2. Użytkownik wybiera datę "do"<br>3. Użytkownik wybiera status<br>4. Użytkownik wprowadza nazwę użytkownika<br>5. Użytkownik klika przycisk pobierania delegacji | Wyświetlenie listy delegacji                                           |
