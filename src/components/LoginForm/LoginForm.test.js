import React from "react";
import { mount } from "enzyme";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";

describe("LoginForm", () => {
    it("renders LoginForm component", () => {
        const mockProps = {
            loading: false,
            error: null,
            logIn: jest.fn()
        }

        const wrapper = mount(
            <BrowserRouter>
                <LoginForm {...mockProps} />
            </BrowserRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("renders an error message if there is a form error", () => {
        let mockProps, wrapper;
        
        mockProps = {
            loading: false,
            error: null,
            logIn: jest.fn()
        }

        wrapper = mount(
            <BrowserRouter>
                <LoginForm {...mockProps} />
            </BrowserRouter>
        );

        expect(wrapper.find("Error").length).toBe(0);

        mockProps = {
            loading: false,
            error: "error",
            logIn: jest.fn()
        }

        wrapper = mount(
            <BrowserRouter>
                <LoginForm {...mockProps} />
            </BrowserRouter>
        );

        expect(wrapper.find("Error").length).toBe(1);
        expect(wrapper.find("Error").text()).toEqual("error");
    });

    it("renders the loading icon when the form submission is loading", () => {
        let wrapper, mockProps;

        mockProps = {
            loading: true,
            error: null,
            logIn: jest.fn()
        }
        
        wrapper = mount(
            <BrowserRouter>
                <LoginForm { ...mockProps } />
            </BrowserRouter>
        );

        expect(wrapper.find("button[type='submit']").html()).toContain("<i class=\"fa fa-spinner fa-spin spinner\"></i>");

        mockProps = {
            loading: false,
            error: null,
            logIn: jest.fn()
        }

        wrapper = mount(
            <BrowserRouter>
                <LoginForm { ...mockProps } />
            </BrowserRouter>
        );
        
        expect(wrapper.find("button[type='submit']").text()).toEqual("Sign in");
    });

    it("correctly fires logIn callback on form submission", () => {        
        const mockValues = {
            email: "test@test.com", 
            password: "Password1!"
        }

        const mockProps = {
            loading: false,
            error: null,
            logIn: jest.fn()
        }

        const wrapper = mount(
            <BrowserRouter>
                <LoginForm {...mockProps} />
            </BrowserRouter>
        );

        wrapper.find("LoginForm").setState(mockValues)
        wrapper.find("form").simulate("submit");

        expect(mockProps.logIn).toHaveBeenCalledTimes(1);
        expect(mockProps.logIn).toHaveBeenCalledWith(mockValues.email, mockValues.password);
    })
});