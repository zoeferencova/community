import React from "react";
import { render } from "enzyme";
import MessageInfo from "./MessageInfo";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("MessageInfo", () => {
    it("renders MessageInfo component given mock context data", () => {
        const mockProps = {
            user: {
                email: "james@gmail.com",
                first_name: "James",
                id: 2,
                location: {lat: 40.748225, lng: -73.89698620000001},
                radius: "3.00"
            },
            loading: false
        }

        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <MessageInfo {...mockProps} />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});