import React from "react";
import { render } from "enzyme";
import PostDetailPage from "./PostDetailPage";
import { MemoryRouter, Route } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("PostDetailPage", () => {
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

    it("renders PostDetailPage component given mock context data", () => { 
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <MemoryRouter initialEntries={[`/post/4`]}>
                    <Route path="/post/:id">
                        <PostDetailPage {...mockProps} />
                    </Route>
                </MemoryRouter>
            </CommUnityContext.Provider>,
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});