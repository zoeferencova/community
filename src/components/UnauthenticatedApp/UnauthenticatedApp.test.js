import React from "react";
import { shallow } from "enzyme";
import UnauthenticatedApp from "./UnauthenticatedApp";


describe("UnauthenticatedApp", () => {
  it("renders UnauthenticatedApp component", () => {
    const wrapper = shallow(<UnauthenticatedApp />);

    expect(wrapper).toMatchSnapshot();
  });
});




