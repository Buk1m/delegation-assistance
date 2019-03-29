import React from "react";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { LoginPage } from "../src/features/LoginPage/LoginPage.component";
import { loginUser } from "../src/actions/user.actions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleSubmit: jest.fn(),
    subbmiting: false,
    invalid: false
  };

  const enzymeWrapper = shallow(<LoginPage {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("Create Login Page", () => {
  it("should render correctly", () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it("should call submit with user object", () => {
    const value = {
      login: "employee",
      password: "pass1"
    };
    const { enzymeWrapper, props } = setup();
    expect(props.handleSubmit).toHaveBeenCalledTimes(0);
    enzymeWrapper.find("Form").simulate("submit", value);
    expect(props.handleSubmit).toBeCalledWith(value);
  });

  it("should render 2 Inputs", () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("Input").length).toBe(2);
  });

  it("should dispatch action", () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(loginUser());

    const actions = store.getActions();
    const expectedPayload = "USER_LOGIN_USER";
    expect(actions[0].type).toEqual(expectedPayload);
  });
});
