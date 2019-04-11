import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import DelegationChecklistPage from "../src/features/DelegationChecklistPage/DelegationChecklistPage.component";
import  mockDelegationChecklist  from "../src/config/delegationChecklist.data";

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleCheck: jest.fn(),
    delegationID: "1",
    activities: mockDelegationChecklist,
    invalid: false
  };

  const enzymeWrapper = shallow(<DelegationChecklistPage {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("Delegation checklist page", () => {
  let enzymeWrapper;
  let props;

  beforeEach(() => {
    ({ enzymeWrapper, props } = setup());
  });

  it("should render correctly", () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it("should render 2 Checkbox", () => {
    expect(enzymeWrapper.find("Checkbox").length).toBe(2);
  });

  it("should render 2 checkboxes labels", () => {
    expect(enzymeWrapper.find("label").length).toBe(2);
    expect(enzymeWrapper.find('label[htmlFor="0"]').text()).toBe("Buy bread");
    expect(enzymeWrapper.find('label[htmlFor="1"]').text()).toBe("Sell PC");
  });

  it("should correctly render checkboxes states", () => {
    expect(enzymeWrapper.find('Checkbox[name="0"]').prop("checked")).toBe(false);
    expect(enzymeWrapper.find('Checkbox[name="1"]').prop("checked")).toBe(true);
  });

  it("should call handlecheck", () => {
    enzymeWrapper.find('Checkbox[name="0"]').simulate('change');
    expect(props.handleCheck).toBeCalled();
  });

  it("should render 2 checkboxes descriptions", () => {
    expect(enzymeWrapper.find("p").length).toBe(2);
  });

  it("should render path to delegations", () => {
    expect(enzymeWrapper.find('a[href="/delegations"]').text()).toBe("Back to delegations");
  });
});