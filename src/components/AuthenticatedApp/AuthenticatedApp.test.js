import React from "react";
import { shallow, mount } from "enzyme";
import AuthenticatedApp from "./AuthenticatedApp";
import { BrowserRouter } from "react-router-dom";


describe("AuthenticatedApp", () => {
    it("renders AuthenticatedApp component", () => {
        const wrapper = shallow(<AuthenticatedApp  />);
        expect(wrapper).toMatchSnapshot();
    });

    it("only renders the Nav component when the logged in user has a first_name value", () => {
        const wrapper = mount(
            <BrowserRouter>
                <AuthenticatedApp />
            </BrowserRouter>
        );

        wrapper.find("AuthenticatedApp").setState({ user: { first_name: "Zoe" } });
        expect(wrapper.find("Nav").length).toBe(1);

        wrapper.find("AuthenticatedApp").setState({ user: {} });
        expect(wrapper.find("Nav").length).toBe(0);
    });
});




