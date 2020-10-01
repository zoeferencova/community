import React from "react";
import { mount } from "enzyme";
import MessageContainer from "./MessageContainer";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("MessageContainer", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <CommUnityContext.Provider value={mockContext}>
                <MessageContainer />
            </CommUnityContext.Provider>
        );
    })

    it("renders MessageContainer component given mock context data", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("displays contacts and not chats using inactiveMobile class if mobileDisplay value in state is null", () => {
        const mockState = {
            chats: mockContext.chats,
            mobileDisplay: null
        }

        wrapper.find("MessageContainer").setState({ ...mockState });
        expect(wrapper.find(".chatRoomContainer").hasClass("inactiveMobile")).toEqual(true);
        expect(wrapper.find(".chatRoomContainer").hasClass("activeMobile")).toEqual(false);
    });

    it("displays chats and not contacts using activeMobile class if mobileDisplay in state value is chats", () => {
        const mockState = {
            chats: mockContext.chats,
            mobileDisplay: "chats"
        }
    
        wrapper.find("MessageContainer").setState({ ...mockState });
        expect(wrapper.find(".chatRoomContainer").hasClass("activeMobile")).toEqual(true);
        expect(wrapper.find(".chatRoomContainer").hasClass("inactiveMobile")).toEqual(false);
    });

    it("displays contacts and not chats using activeMobile class if mobileDisplay in state value is contacts", () => {
        const mockState = {
            chats: mockContext.chats,
            mobileDisplay: "contacts"
        }

        wrapper.find("MessageContainer").setState({ ...mockState });
        expect(wrapper.find(".chatRoomContainer").hasClass("inactiveMobile")).toEqual(true);
        expect(wrapper.find(".chatRoomContainer").hasClass("activeMobile")).toEqual(false);
    });

    it("displays messages from activeChat and not 'choose a chat' message when activeChat has a value that is not null in context", () => {
        const mockState = {
            chats: mockContext.chats,
            mobileDisplay: null
        }

        wrapper.find("MessageContainer").setState({ ...mockState });

        expect(wrapper.context("activeChat").id).toEqual(25);
        expect(wrapper.find("Messages").length).toBe(1);
        expect(wrapper.find(".choose").length).toBe(0);
    });

    it("displays 'choose a chat' message and no messages when activeChat is null in context", () => {
        const newContext = { ...mockContext, activeChat: null }
        
        wrapper = mount(
            <CommUnityContext.Provider value={newContext}>
                <MessageContainer />
            </CommUnityContext.Provider>
        );
        
        const mockState = {
            chats: newContext.chats,
            mobileDisplay: null
        }

        wrapper.find("MessageContainer").setState({ ...mockState });

        expect(wrapper.context("activeChat")).toEqual(null);
        expect(wrapper.find("Messages").length).toBe(0);
        expect(wrapper.find(".choose").length).toBe(1);
    });
});