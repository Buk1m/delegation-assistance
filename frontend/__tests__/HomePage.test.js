import React from "react";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import HomePage from "../src/features/HomePage/HomePage.component";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleSubmit: jest.fn(),
    subbmiting: false,
    invalid: false
  };

  const enzymeWrapper = shallow(<HomePage {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("Home Page", () => {
  let enzymeWrapper;
  let props;

  beforeEach(() => {
    ({ enzymeWrapper, props } = setup());
  });

  it("should render correctly", () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
