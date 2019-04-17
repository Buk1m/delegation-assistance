import React from "react";
import { View, Button, Text } from "react-native";
import { render, fireEvent, shallow } from "react-native-testing-library";
import { Field } from "redux-form";
import thunk from "redux-thunk";

import { validateRequired } from "../src/validators/Validators";
import LoginScreen from "../src/features/LoginScreen/LoginScreen.component";
import { LoginScreenContainer } from "../src/features/LoginScreen/LoginScreen.container";
import {
  renderWithTestingLibrary,
  renderWithRenderer
} from "../test/redux-mock.js";

describe("Login screen rendering", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = renderWithTestingLibrary(<LoginScreen />);
  });

  it("renders the Login screen", async () => {
    const tree = renderWithRenderer(<LoginScreen handleSubmit={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it("login should be required", () => {
    const { getByTestId } = wrapper;
    const field = getByTestId("field-login");
    expect(field).toBeDefined();
    expect(field.props.validate).toContain(validateRequired);
  });

  it("password should", () => {
    const { getByTestId } = wrapper;
    const field = getByTestId("field-password");
    expect(field).toBeDefined();
    expect(field.props.validate).toContain(validateRequired);
  });

  it("passwrod should be secure type", () => {
    const { getByTestId } = wrapper;
    const field = getByTestId("field-password");
    expect(field).toBeDefined();
    expect(field.props.isSecure).toBe(true);
  });

  it("should render hello message", () => {
    const { getByText } = wrapper;
    expect(getByText("Hello!")).toBeDefined();
  });
});

describe("Login screen interactions", () => {
  it("should call handleSubmit on submit", () => {
    const onSubmitMock = jest.fn();
    const { getByType } = renderWithTestingLibrary(
      <LoginScreen handleSubmit={onSubmitMock} />
    );
    const btn = getByType(Button);
    fireEvent(btn, "press");
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
