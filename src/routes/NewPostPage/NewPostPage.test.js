import React from "react";
import { render } from "enzyme";
import NewPostPage from "./NewPostPage";
import { MemoryRouter, Route } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("NewPostPage", () => {
    it("renders NewPostPage component given mock context data", () => {
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <MemoryRouter initialEntries={[`/new-post/request`]}>
                    <Route path="/new-post/:type">
                        <NewPostPage />
                    </Route>
                </MemoryRouter>
            </CommUnityContext.Provider>,
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});