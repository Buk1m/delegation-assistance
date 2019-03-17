import React from "react";
import renderer from "react-test-renderer";

import HomePage from "../src/features/HomePage/HomePage.component";

it("renders correctly", () => {
  const tree = renderer.create(<HomePage />).toJSON();
  expect(tree).toMatchSnapshot();
});
