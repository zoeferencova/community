import React from "react";
import { shallow } from "enzyme";
import MapSearch from "./MapSearch";

describe("MapSearch", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<MapSearch />);
    })

    it("renders MapSearch component", () => {
        expect(wrapper).toMatchSnapshot();
    });
});