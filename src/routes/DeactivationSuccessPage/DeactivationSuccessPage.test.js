import React from "react";
import { render } from "enzyme";
import DeactivationSuccessPage from "./DeactivationSuccessPage";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("DeactivationSuccessPage", () => {
    it("renders DeactivationSuccessPage component given mock context data", () => {
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <DeactivationSuccessPage />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});