import React from "react";
import { render } from "enzyme";
import ChangePasswordPage from "./ChangePasswordPage";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("ChangePasswordPage", () => {
    it("renders ChangePasswordPage component given mock context data", () => {
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <ChangePasswordPage />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});