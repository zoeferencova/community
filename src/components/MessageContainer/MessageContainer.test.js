import React from "react";
import { render } from "enzyme";
import MessageContainer from "./MessageContainer";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("MessageContainer", () => {
    it("renders MessageContainer component given mock context data", () => {
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <MessageContainer />
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});