import React from "react";
import { render } from "enzyme";
import Post from "./Post";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("Post", () => {
    let wrapper;

    const mockProps = {
        categories: mockContext.neighborhood_posts[0].categories,
        first_name: mockContext.neighborhood_posts[0].first_name,
        post_type: mockContext.neighborhood_posts[0].first_name,
        distance_from_user: mockContext.neighborhood_posts[0].distance_from_user,
        description: mockContext.neighborhood_posts[0].description,
        id: mockContext.neighborhood_posts[0].id
    }

    beforeEach(() => {
        wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <Post {...mockProps} />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
    })

    it("renders Post component given mock context data", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("correctly displays post title sentence according to post_type prop", () => {
        expect(wrapper.find("h4").text()).toEqual("James requested help");

        let newProps = {
            categories: mockContext.neighborhood_posts[1].categories,
            first_name: mockContext.neighborhood_posts[1].first_name,
            post_type: mockContext.neighborhood_posts[1].first_name,
            distance_from_user: mockContext.neighborhood_posts[1].distance_from_user,
            description: mockContext.neighborhood_posts[1].description,
            id: mockContext.neighborhood_posts[1].id
        }

        wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <Post {...newProps} />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );

        expect(wrapper.find("h4").text()).toEqual("Anna requested help")
    });
})