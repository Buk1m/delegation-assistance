import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store"; 
import thunk from "redux-thunk";

import { CreateDelegationPage } from "../src/features/CreateDelegationPage/CreateDelegationPage.component";
import { addNewDelegation } from "../src/actions/delegations.actions";

const middlewares = [thunk]; 
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleSubmit: jest.fn(),
    subbmiting: false,
    invalid: false
  };

  const enzymeWrapper = shallow(<CreateDelegationPage {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("Create Delegation Page", () => {

  let enzymeWrapper;
  let props;
  
  beforeEach(() => {
     ({ enzymeWrapper, props } = setup());
  });

  it("should render correctly", () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it("should call submit with delegation object", () => {
    const value = {
      startDate: "02-03-2004",
      endDate: "02-03-2004",
      delegationObjective: "testObjective",
      destinationCountryISO3: "testCountry",
      destinationLocation: "testLocation"
    };
    enzymeWrapper.find("Form").simulate("submit", value);
    expect(props.handleSubmit).toBeCalledWith(value);
  });

  it("should render 3 Inputs", () => {
    expect(enzymeWrapper.find("Input").length).toBe(3);
  });

  it("should render destinationCountryISO3 Input", () => {
    expect(
      enzymeWrapper.find("Input[name='destinationCountryISO3']").length
    ).toBe(1);
  });

  it("should render destinationLocation Input", () => {
    expect(enzymeWrapper.find("Input[name='destinationLocation']").length).toBe(
      1
    );
  });

  it("should render delegationObjective Input", () => {
    expect(enzymeWrapper.find("Input[name='delegationObjective']").length).toBe(
      1
    );
  });

  it("should render startDate DatePicker", () => {
    expect(enzymeWrapper.find("Field[name='startDate']").length).toBe(1);
  });

  it("should render endDate DatePicker", () => {
    expect(enzymeWrapper.find("Field[name='endDate']").length).toBe(1);
  });

  it("should dispatch action", () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(addNewDelegation());

    const actions = store.getActions();
    const expectedPayload = "DELEGATIONS_ADD_DELEGATION";
    expect(actions[0].type).toEqual(expectedPayload);
  });
});
