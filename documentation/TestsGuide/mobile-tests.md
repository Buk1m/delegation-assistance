# Testowanie mobilki - Guidelines

## Tworzenie migawki

Praca z migawkami działa poprawnie tylko z `react-test-renderer`.  
Jeżeli testowany komponent nie korzysta z `reduxa` to wystarczy zaimportować `renderer` i utworzyć migawkę:

```js
import React from "react";
import renderer from "react-test-renderer";

//testowany komponent
import ExampleComponent from "../ExampleComponentHome";

it("should render ExampleComponent correctly", () => {
  const tree = renderer.create(<ExampleComponent />);
  expect(tree).toMatchSnapshot();
});
```

## Metody pomocnicze do mockowania store (redux connected components)

Jeżeli komponent korzysta z `redux` i jest exportowany przez metodę `connect`, mozna skorzystać z metod pomocniczych:

<hr>

### Metoda renderWithTestingLibrary

- `renderWithTestingLibrary` - renderuje komponent do testów za pomocą `react-native-testing-library`

Zwraca obiekt z metodami pomocniczymi opisanymi tutaj:

> [React Native Testing Library API](https://callstack.github.io/react-native-testing-library/docs/api)

### Metoda renderWithRenderer

- `renderWithRenderer` - zwraca wynik metody `rendrer.create()` z zamockowanym `store` (pozwala korzystać z instance)

Zwraca `testRenderer` opisany tutaj:

> [Jest - testRenderer](https://reactjs.org/docs/test-renderer.html#testrenderer)

<hr>

obie metody przyjmują ten sam zestaw parametrów:

- `component` - poprawny kod JSX z testowanym komponentem, np. `<ExampleComponent />`
- `initialState = {}` - stan początkowy store - domyślnie pusty obiekt
- `middlewares = []` - tablica middeware wykorzystywanych do obsługi zapytań i akcji asynchronicznych - domyślnie pusta tablica

Jeżeli nie potrzebujemy korzystać ze stora w testach to wystarczy przekazać JSX z testowanym elementem

### Przykład wywołania renderWithTestingLibrary:

Załóżmy, że komponent `SomeForm` to formularz `redux-form`, przyjmujący jako props metodę handleSubmit, która wykona się przy zatwierdzaniu formularza.

```js
//react-test-renderer

it("should call handleSubmit when submit-button is pressed", () => {
  //mockujemy metode handleSubmit
  const handleSubmitMock = jest.fn();

  // korzystamy z metody pomocniczej i przekazujemy jako props nasz mock.
  // metoda renderWithTestingLibrary zwraca obiekt z metodami do wyszukiwania elementów
  // metod getBy...  jest sporo i są opisane tutaj
  // https://callstack.github.io/react-native-testing-library/docs/api
  const { getByType } = renderWithTestingLibrary(
    <SomeForm handleSubmit={handleSubmitMock} />
  );

  // znajdujemy odpowiedni element za pomocą matchera
  const button = getByType(Button);

  // wywołujemy na nim event
  fireEvent(button, "press");

  // sprawdzamy czy podana metoda została wywołana
  expect(handleSubmitMock).toHaveBeenCalled();
});
```

# Mockowanie metod i komponentów

> [Jest docs - mocks ](https://jestjs.io/docs/en/es6-class-mocks)

# Dostępne metody na expect

> [Expect methods](https://jestjs.io/docs/en/expect)

# Github wykorzystywanego react native testing library - przykłady testów

> [React native testing library - github](https://github.com/callstack/react-native-testing-library)

# Najczęstsze błędy i rozwiązania

## Redux connected components bez store

```
Invariant Violation: Could not find "store" in the context of "Connect(Form(YourComponent))". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Form(YourComponent)) in connect options.
```

- Skorzystaj z metody pomocniczej renderWithTestingLibrary  
  lub
- Utwórz mock store na podstawie:
  https://github.com/dmitry-zaets/redux-mock-store

# Napotkane problemy

1. Do tworzenia migawek trzeba używać `react-test-renderer`, pomimo sprawdzenia wielu przykładów konfiguracji, różnych json serializerów i konfiguracji babla, migawki nie zawierały oryginalnych nazw komponentów tylko każdy był jako <Component> https://github.com/airbnb/enzyme/issues/1743 issue nie ma rozwiązania

2. https://github.com/facebook/react-native/issues/21937 to sugeruje, że rozwiązanie jest w nowszej wersji ReactNative, ale używając `ReactNative-expo 32.0.0 SDK` korzystamy z `ReactNative 57.1.0`, jako że to najnowsza wersja dla `expo` to nie wiem czy jest możliwość zmiany wersji react-native na wyższa.
