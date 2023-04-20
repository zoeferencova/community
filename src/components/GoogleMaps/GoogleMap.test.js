import React from "react";
import { shallow } from "enzyme";
import GoogleMap from "./GoogleMaps";

describe("GoogleMap", () => {
  it("renders GoogleMap component", () => {
    const wrapper = shallow(<GoogleMap />);

    expect(wrapper).toMatchSnapshot();
  })
})



