import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";
import { render, fireEvent, shallow } from "react-native-testing-library";

import DelegationChecklistScreen from "../src/features/DelegationChecklistScreen/DelegationChecklistScreen.component";

describe("DelegationChecklist snapshot", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<DelegationChecklistScreen />);
    expect(tree).toMatchSnapshot();
  });

  it("should render View", () => {
    const { getByType } = render(<DelegationChecklistScreen />);
    expect(getByType(View)).toBeDefined();
  });
});
