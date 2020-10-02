import React from "react";
import { mount } from "enzyme";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter } from "react-router-dom";

describe("RegistrationForm", () => {
    it("renders RegistrationForm component", () => {
        const mockProps = {
            loading: false,
            error: null,
            register: jest.fn()
        }

        const wrapper = mount(
            <BrowserRouter>
                <RegistrationForm {...mockProps} />
            </BrowserRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("renders an error message if there is a form error", () => {
        let mockProps, wrapper;
        
        mockProps = {
            loading: false,
            error: null,
            register: jest.fn()
        }

        wrapper = mount(
            <BrowserRouter>
                <RegistrationForm {...mockProps} />
            </BrowserRouter>
        );

        expect(wrapper.find("Error").length).toBe(0);

        mockProps = {
            loading: false,
            error: "error",
            register: jest.fn()
        }

        wrapper = mount(
            <BrowserRouter>
                <RegistrationForm {...mockProps} />
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
            register: jest.fn()
        }
        
        wrapper = mount(
            <BrowserRouter>
                <RegistrationForm { ...mockProps } />
            </BrowserRouter>
        );

        expect(wrapper.find("button[type='submit']").html()).toContain("<i class=\"fa fa-spinner fa-spin spinner\"></i>");

        mockProps = {
            loading: false,
            error: null,
            register: jest.fn()
        }

        wrapper = mount(
            <BrowserRouter>
                <RegistrationForm { ...mockProps } />
            </BrowserRouter>
        );
        
        expect(wrapper.find("button[type='submit']").text()).toEqual("Create account");
    });

    it("correctly fires logIn callback on form submission", () => {        
        const mockValues = {
            first_name: "Test",
            email: "test@test.com", 
            password: "Password1!",
            confirm_password: "Password1!"
        }

        const mockProps = {
            loading: false,
            error: null,
            register: jest.fn()
        }

        const wrapper = mount(
            <BrowserRouter>
                <RegistrationForm {...mockProps} />
            </BrowserRouter>
        );

        wrapper.find("RegistrationForm").setState(mockValues)
        wrapper.find("form").simulate("submit");

        expect(mockProps.register).toHaveBeenCalledTimes(1);
        expect(mockProps.register).toHaveBeenCalledWith(mockValues.first_name, mockValues.email, mockValues.password, mockValues.confirm_password);
    })
});