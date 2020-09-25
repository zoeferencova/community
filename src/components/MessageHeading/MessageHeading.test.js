import React from "react";
import { render } from "enzyme";
import MessageHeading from "./MessageHeading";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("MessageHeading", () => {
    it("renders MessageHeading component given mock context data", () => {
        const mockProps = {
            receiver: {
                first_name: "James",
                id: 2
            }
        }
    
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <MessageHeading {...mockProps} />
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});