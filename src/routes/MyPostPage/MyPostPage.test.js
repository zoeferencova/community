import React from "react";
import { render } from "enzyme";
import MyPostPage from "./MyPostPage";
import { MemoryRouter, Route } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("MyPostPage", () => {
    it("renders MyPostPage component given mock context data", () => { 
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <MemoryRouter initialEntries={[`/my-post/1`]}>
                    <Route path="/my-post/:id">
                        <MyPostPage />
                    </Route>
                </MemoryRouter>
            </CommUnityContext.Provider>,
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});