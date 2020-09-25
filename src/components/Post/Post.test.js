import React from "react";
import { render } from "enzyme";
import Post from "./Post";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("Post", () => {
    it("renders Post component given mock context data", () => {
        const mockProps = {
            categories: mockContext.neighborhood_posts[0].categories,
            first_name: mockContext.neighborhood_posts[0].first_name
        }

        const wrapper = render (
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <Post {...mockProps} />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();

    })
})