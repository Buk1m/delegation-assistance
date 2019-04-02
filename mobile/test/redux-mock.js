import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render } from "react-native-testing-library";
import renderer from "react-test-renderer";

function renderWithTestingLibrary(
  component,
  initialState = {},
  middlewares = []
) {
  const store = configureStore(middlewares)(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
}

function renderWithRenderer(component, initialState = {}, middlewares = []) {
  const store = configureStore(middlewares)(initialState);
  return renderer.create(<Provider store={store}>{component}</Provider>);
}

export { renderWithTestingLibrary, renderWithRenderer };
