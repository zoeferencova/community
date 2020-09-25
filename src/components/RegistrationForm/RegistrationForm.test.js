import React from "react";
import { render } from "enzyme";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter } from "react-router-dom";

describe("RegistrationForm", () => {
    it("renders RegistrationForm component", () => {
        const wrapper = render(
            <BrowserRouter>
                <RegistrationForm />
            </BrowserRouter>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});