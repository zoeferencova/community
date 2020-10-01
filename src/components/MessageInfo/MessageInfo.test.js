import React from "react";
import { mount } from "enzyme";
import MessageInfo from "./MessageInfo";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("MessageInfo", () => {
    let wrapper, mockProps;

    beforeEach(() => {
        mockProps = {
            user: {
                email: "james@gmail.com",
                first_name: "James",
                id: 2,
                location: {lat: 40.748225, lng: -73.89698620000001},
                radius: "3.00"
            },
            loading: false,
            deleteChat: jest.fn()
        }

        wrapper = mount(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <MessageInfo {...mockProps} />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
    })

    it("renders MessageInfo component given mock context data", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("correctly formats the information sentence", () => {
        expect(wrapper.find("p").html()).toEqual("<p>James offered to help you<span><i class=\"fas fa-heart heart\"></i></span></p>")
    });

    it("go to post button redirects user to correct post", () => {
        wrapper.find("#post-button").first().simulate("click");
        expect(location.href).toEqual("http://localhost/post/4")
    });

    it("delete chat button calls deleteChat function and removes chat", () => {
        wrapper.find("#delete-button").first().simulate("click");
        expect(mockProps.deleteChat).toHaveBeenCalledTimes(1);
    });
});