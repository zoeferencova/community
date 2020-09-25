import React from "react";
import { render } from "enzyme";
import LocationPage from "./LocationPage";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("LocationPage", () => {
    it("renders LocationPage component given mock context data", () => {
        const mockProps = {
            location: mockContext.user.location,
            radius: parseFloat(mockContext.user.radius)
        }

        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <LocationPage {...mockProps} />
                </BrowserRouter>  
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});