import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { CreateTaskPage } from "../src/features/CreateTaskPage/CreateTaskPage.component";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleSubmit: jest.fn(),
    subbmiting: false,
    invalid: false
  };

  const enzymeWrapper = shallow(<CreateTaskPage {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("Checklists Page", () => {
  let enzymeWrapper;
  let props;

  beforeEach(() => {
    ({ enzymeWrapper, props } = setup());
  });

  it("should render correctly", () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it("should call submit with task object", () => {
    const value = {
      name: "Task name",
      desciption: "Task description"
    };
    enzymeWrapper.find("Form").simulate("submit", value);
    expect(props.handleSubmit).toBeCalledWith(value);
  });
});
