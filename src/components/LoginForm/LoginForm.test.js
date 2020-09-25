import React from "react";
import { render } from "enzyme";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";

describe("LoginForm", () => {
    it("renders LoginForm component", () => {
        const wrapper = render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});