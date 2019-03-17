import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import HomeScreen from "../src/features/HomeScreen/HomeScreen.component";

describe("Home snapshot", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the Home screen", async () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
