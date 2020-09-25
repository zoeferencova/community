import React from "react";
import { render } from "enzyme";
import MessageSideBar from "./MessageSideBar";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("MessageSideBar", () => {
    it("renders MessageSideBar component given mock context data", () => {     
        const mockProps = {
            chats: [
                {
                    ...mockContext.chats[0], 
                    user1: {first_name: "Zoe", id: 1},
                    user2: {first_name: "James", id: 2}
                }
            ],
            activeChat: mockContext.activeChat,
            setActiveChat: jest.fn()
        }
        
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <MessageSideBar {...mockProps} />
            </CommUnityContext.Provider>
        ); 

        expect(wrapper).toMatchSnapshot();
    });
});