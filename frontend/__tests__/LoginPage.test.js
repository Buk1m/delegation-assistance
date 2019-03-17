import React from "react";
import renderer from "react-test-renderer";

import LoginPage from "../src/features/LoginPage/LoginPage.component";

it("renders correctly", () => {
  const tree = renderer.create(<LoginPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
