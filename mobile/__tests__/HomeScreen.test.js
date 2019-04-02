import React from "react";
import { Text, View } from "react-native";
import renderer from "react-test-renderer";
import { render, fireEvent, shallow } from "react-native-testing-library";

import HomeScreen from "../src/features/HomeScreen/HomeScreen.component";

describe("Home snapshot", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<HomeScreen />);
    expect(tree).toMatchSnapshot();
  });

  it("should render View", () => {
    const { getByType } = render(<HomeScreen />);
    expect(getByType(View)).toBeDefined();
  });

  it("should render Text with 'Home Screen' title", () => {
    const { getByType } = render(<HomeScreen />);
    text = getByType(Text);
    expect(text).toBeDefined();
    expect(text.props.children).toBe("Home Screen");
  });
});
