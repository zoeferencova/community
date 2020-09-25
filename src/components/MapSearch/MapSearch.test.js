import React from "react";
import { shallow } from "enzyme";
import MapSearch from "./MapSearch";

describe("MapSearch", () => {
    it("renders MapSearch component", () => {
        const wrapper = shallow(<MapSearch />);
        
        expect(wrapper).toMatchSnapshot();
    });
});