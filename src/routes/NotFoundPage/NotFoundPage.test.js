import React from "react";
import { shallow } from "enzyme";
import NotFoundPage from "./NotFoundPage";


describe("NotFoundPage", () => {
  it("renders NotFoundPage component", () => {
    const wrapper = shallow(<NotFoundPage />);

    expect(wrapper).toMatchSnapshot();
  });
});




