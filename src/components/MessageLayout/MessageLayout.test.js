import React from "react";
import { shallow } from "enzyme";
import MessageLayout from "./MessageLayout";

describe("MessageLayout", () => {
    it("renders MessageLayout component", () => {
        const wrapper = shallow(<MessageLayout />);
        
        expect(wrapper).toMatchSnapshot();
    });
});