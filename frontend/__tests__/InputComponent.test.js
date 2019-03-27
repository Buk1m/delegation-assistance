import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Input from "../src/components/Input/Input.component";

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    name: "testName",
    label: "testLabel",
  };

  const enzymeWrapper = shallow(<Input {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("Input Component", () => {
  it("should render Input correctly", () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it("should render provided label correctly", () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find(".label-bold").props().children).toEqual(
      "testLabel"
    );
  });

  it("should change disabled state", ()=>{
    const { props } = setup();
    props.disabled = false;
    const enzymeWrapper = shallow(<Input {...props} />);
    expect(enzymeWrapper.find("Field").prop("disabled")).toEqual(false);
    props.disabled = true;
    enzymeWrapper.setProps(props);
    expect(enzymeWrapper.find("Field").prop("disabled")).toEqual(true);
  });

});
