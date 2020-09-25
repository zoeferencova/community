import React from "react";
import { render } from "enzyme";
import LandingPage from "./LandingPage";
import { BrowserRouter } from "react-router-dom";

describe("LandingPage", () => {
    it("renders LandingPage component given mock context data", () => {
        const wrapper = render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});