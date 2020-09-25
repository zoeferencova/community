import React from "react";
import { render } from "enzyme";
import AccountPage from "./AccountPage";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("AccountPage", () => {
    it("renders AccountPage component given mock context data", () => {
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <AccountPage />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});