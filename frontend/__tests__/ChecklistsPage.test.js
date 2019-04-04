import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { ChecklistsPage } from "../src/features/ChecklistsPage/ChecklistsPage.component";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleSubmit: jest.fn(),
    subbmiting: false,
    invalid: false,
    tasks: [
      {
        id: 1,
        name: "Checkbox 1",
        description: "Description 1"
      },
      {
        id: 2,
        name: "Checkbox 2",
        description: "Description 2"
      },
      {
        id: 3,
        name: "Checkbox 3",
        description: "Description 3"
      }
    ],
    isUserTravelmanager: true,
    handleDelete: jest.fn()
  };

  const enzymeWrapper = shallow(<ChecklistsPage {...props} />);

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

  it("When user WITHOUT role manage is logged in, should render second button", () => {
    const state = { ...props, isUserTravelmanager: false };
    const WithoutManagerRole = shallow(<ChecklistsPage {...state} />);
    expect(WithoutManagerRole.find("Button").length).toBe(1);
  });

  it("When user WITH role manage is logged in, shouldn't render second button", () => {
    expect(enzymeWrapper.find("Button").length).toBe(2);
  });
});
