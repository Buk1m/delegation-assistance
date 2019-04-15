# Spis treści

- [Testowanie za pomocą WebdriverIO](#testowanie-za-pomocą-webdriverio)
  - [Konfiguracja środowiska](#konfiguracja-środowiska)
    - [Uruchamianie testów e2e](#uruchamianie-testów-e2e)
      - [Chrome](#chrome)
      - [Firefox](#firefox)
- [Pisanie testów e2e](#pisanie-testów-e2e)
- [Przydatne opcje konfiguracji](#przydatne-opcje-konfiguracji)
- [Deubgowanie](#deubgowanie)
- [Jak nie uruchamiać wszystkich testów](#jak-nie-uruchamiać-wszystkich-testów)
- [Przydatne docsy](#przydatne-docsy)

<a name="testowanie-za-pomocą-webdriverio"></a>

# Testowanie za pomocą WebdriverIO

<a name="konfiguracja-środowiska"></a>

## Konfiguracja środowiska

1. `yarn` w folderze `idemia19/tests`
2. `yarn` w folderze `idemia19/frontend` 

<a name="#uruchamianie-testów-e2e"></a>

## Uruchamianie testów e2e

1. Uruchomić projekt `backend` w trybie `dev`.

```
mv backend/src/main/resources/application-dev.properties{.sample,} && mvn clean install spring-boot:run -Dspring-boot.run.profiles=dev`
```

2. Uruchomić projekt `frontend` za pomoca `yarn dev`.
3. Wystartować testy jedną z komend:

<a name="#chrome"></a>

### Chrome

- `yarn test-chrome` - to start e2e tests using Chrome (can run multiple instances simultaneously)
- `yarn test-chrome-watch` - to start e2e tests with hot-rerun on every change using Chrome

<a name="#firefox"></a>

### Firefox

- `yarn test-firefox` - to start e2e tests once using Firefox (doesn't support multiple instances with current config)
- `yarn test-firefox-watch` - to start e2e tests with hot-rerun on every change using Firefox

<a name="#pisanie-testów-e2e"></a>

## Pisanie testów e2e

1. Należy utworzyć w `<root-dir>/__tests__/e2e/pageobjects/` odpowiedni [PageObject](https://webdriver.io/docs/pageobjects.html) z nazwą `[testowana_strona].page.js`.
2. Wewnątrz pliku należy utworzyć klasę, która dziedziczy z klasy `Page` - plik `page.js`.
3. Zdefiniować w utworzonym `pageobject` selektory dla elementów na stronie, które będą wykorzystywane w teście.
   - Więcej informacji tu: [Selectors](https://webdriver.io/docs/selectors.html)
4. Utworzyć plik zwierający testy w folderze `<root-dir>/__tests__/e2e/specs/` o nazwie `[testowana_strona].spec.js`
   - pliki o innym suffixie niż `.spec.js` nie będą brane pod uwagę.
5. Zaimportować utworzony wcześniej `[testowana_strona].page.js` i korzystając z napisanych selektorów oraz [Chai Assertion Library](https://www.chaijs.com/guide/styles/#expect) pisać asercje i testować!
6. Korzystać garściamy z przykładów `Login.spec.js` oraz `CreateDelegation.spec.js`.

<a name="#przydatne-opcje-konfiguracji"></a>

## Przydatne opcje konfiguracji

Mowa o opcjach w plikach `<root-dir>/wdio-config/*.conf.js`
Plik z `chrome` w nazwie dotyczy tylko konfiguracji Chrome itd.

w sekcji `capabilities`

```js
  capabilities: [
    {
      maxInstances: 5,
      browserName: "chrome",
    //   "goog:chromeOptions": {
    //     args: ["--headless", "--disable-gpu"]
    //   }
    }
  ],
```

można ustawić ile jednocześnie przeglądarek zostanie otwartych do testów. np. jeżeli mamy 5 plików z testami `spec.js` to ustawienie `maxInstances: 5` pozwoli wykonać wszystkie testy jednocześnie.

argument:

```js
    "goog:chromeOptions": {
        args: ["--headless", "--disable-gpu"]
```

pozwala uruchamiać testy bez otwierania okien przegladarki, wystarczy odkomentować w plikach `conf.js`.

poziom logowania:

```js
  logLevel: "error", // Level of logging verbosity: silent | verbose | command | data | result | error
```

gdyby ktoś chciał wiedzieć więcej [wdio options](https://webdriver.io/docs/options.html)

<a name="#debugowanie"></a>

## Deubgowanie

Wykonywanie testu można zatrzymać w dowolnym miejscu za pomocą `browser.debug();`. Pisząc taką instrukcje w kodzie, przeglądarka zatrzyma się gdy na nią trafi. Trzeba wtedy mieć włączone otwieranie przeglądarki podczas testów.
[Debugging](https://webdriver.io/docs/debugging.html)

<a name="#jak-nie-uruchamiać-wszystkich-testów"></a>

## Jak nie uruchamiać wszystkich testów

- [Grupowanie testów](https://webdriver.io/docs/organizingsuites.html#group-test-specs)
  (Aby korzystać z wdio w konsoli trzeba dodać folder z `wdio` do `PATH`)

<a name="#przydatne-docsy"></a>

## Przydatne docsy

- [Chai Assertion Library](https://www.chaijs.com/guide/styles/#expect) - Biblioteka do assercji `expect`
- [WebdriverIO API](https://webdriver.io/docs/api.html) - Metody udostępniane przez WebdriverIO - pozwalają na pobieranie stanu przegladarki i elementów DOM
- [Selectors](https://webdriver.io/docs/selectors.html) - Opis(kiepski) części dostęnych selektorów
- [Debugging](https://webdriver.io/docs/debugging.html) - to samo co w Debudowanie
- [WebdriverIO - Guide](https://webdriver.io/docs/gettingstarted.html)
- [Mocha](https://mochajs.org/#delayed-root-suite) - Testrunner, składnia pisania testów
