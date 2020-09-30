import React from "react";
import { render } from "enzyme";
import PostDetailPage from "./PostDetailPage";
import { MemoryRouter, Route } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("PostDetailPage", () => {
    const mockProps = {
        chats: mockContext.chats,
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