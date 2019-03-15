import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import LoginScreen from "../src/features/LoginScreen/LoginScreen.component";

describe("Login snapshot", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the Login screen", async () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
