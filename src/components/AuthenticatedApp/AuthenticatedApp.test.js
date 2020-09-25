import React from "react";
import { shallow } from "enzyme";
import AuthenticatedApp from "./AuthenticatedApp";


describe("AuthenticatedApp", () => {
  it("renders AuthenticatedApp component", () => {
    const wrapper = shallow(<AuthenticatedApp />);

    expect(wrapper).toMatchSnapshot();
  });
});




