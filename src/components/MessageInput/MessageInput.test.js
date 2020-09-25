import React from "react";
import { shallow } from "enzyme";
import MessageInput from "./MessageInput";

describe("MessageInput", () => {
    it("renders MessageInput component", () => {
        const wrapper = shallow(<MessageInput />);
        
        expect(wrapper).toMatchSnapshot();
    });
});