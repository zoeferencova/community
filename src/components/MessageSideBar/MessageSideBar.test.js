import React from "react";
import { mount } from "enzyme";
import MessageSideBar from "./MessageSideBar";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("MessageSideBar", () => {
    let wrapper;

    const mockProps = {
        chats: mockContext.chats,
        activeChat: mockContext.activeChat,
        setActiveChat: jest.fn()
    }

    beforeEach(() => {
        wrapper = mount(
            <CommUnityContext.Provider value={mockContext}>
                <MessageSideBar {...mockProps} />
            </CommUnityContext.Provider>
        ); 
    })

    it("renders MessageSideBar component given mock context data", () => {     
        expect(wrapper).toMatchSnapshot();
    });

    it("applies active class to only the chat that is the activeChat in context", () => {
        expect(wrapper.find("#chat25").hasClass("active")).toEqual(true);
    });

    it("does not apply the active class to any chats if activeChat is null in context", () => {
        const newContext = { ...mockContext, activeChat: null }
        const newProps = { ...mockProps, activeChat: null }

        wrapper = mount(
            <CommUnityContext.Provider value={newContext}>
                <MessageSideBar {...newProps} />
            </CommUnityContext.Provider>
        ); 

        expect(wrapper.find(".active").length).toEqual(0);
    });

    it("clicking on a user fires the setActiveChat callback", () => {
        const newContext = { ...mockContext, activeChat: null }
        const newProps = { ...mockProps, activeChat: null }

        wrapper = mount(
            <CommUnityContext.Provider value={newContext}>
                <MessageSideBar {...newProps} />
            </CommUnityContext.Provider>
        ); 

        wrapper.find("#chat25").simulate("click");

        expect(mockProps.setActiveChat).toHaveBeenCalledTimes(1);
        expect(mockProps.setActiveChat).toHaveBeenCalledWith(mockProps.activeChat);
    });
});