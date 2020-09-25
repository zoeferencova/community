import React from "react";
import { render } from "enzyme";
import RegistrationPage from "./RegistrationPage";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("RegistrationPage", () => {
    it("renders RegistrationPage component given mock context data", () => {
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <RegistrationPage />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});