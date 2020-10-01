import React from "react";
import { shallow } from "enzyme";
import MessageInput from "./MessageInput";

describe("MessageInput", () => {
    let wrapper, mockProps;

    beforeAll(() => {
        mockProps = {
            sendMessage: jest.fn()
        }

        wrapper = shallow(<MessageInput { ...mockProps } />)
    })

    it("renders MessageInput component", () => {        
        expect(wrapper).toMatchSnapshot()
    });

    it("calls sendMessage function and clears message value when message input form is submitted", () => {
        wrapper.setState({ message: "test" })
        wrapper.find(".messageForm").simulate("submit")

        expect(mockProps.sendMessage).toHaveBeenCalledTimes(1)
        expect(wrapper.find("#message").prop("value")).toEqual("");
    });
});