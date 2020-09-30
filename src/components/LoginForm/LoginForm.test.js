import React from "react";
import { mount } from "enzyme";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";

describe("LoginForm", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
    })

    it("renders LoginForm component", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("renders an error message if there is a form error", () => {
        expect(wrapper.find("Error").length).toBe(0);
        
        wrapper.find("LoginForm").setState({ error: "error" });
        expect(wrapper.find("Error").length).toBe(1);
        expect(wrapper.find("Error").text()).toEqual("error")
    })
});