import React from "react";
import { mount } from "enzyme";
import AccountPage from "./AccountPage";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("AccountPage", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <AccountPage />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
    });

    it("renders AccountPage component given mock context data", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("calls logout function from context when log out button is clicked", () => {
        wrapper.find(".logoutButton").first().simulate("click");
        expect(mockContext.logout).toHaveBeenCalledTimes(1);
    });
});