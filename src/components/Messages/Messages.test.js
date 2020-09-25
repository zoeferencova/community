import React from "react";
import { render } from "enzyme";
import Messages from "./Messages";
import CommUnityContext from "../../contexts/context";
import mockContext from "../../contexts/mock-context";

describe("Messages", () => {
    it("renders Messages component given mock context data", () => {
        const mockProps = {
            messages: [
                {
                    chat_id: 25,
                    id: 285,
                    message_content: "hi",
                    message_timestamp: "2020-09-17T18:22:47.088676",
                    sender_id: 1
                },
                {
                    chat_id: 25,
                    id: 286,
                    message_content: "hey",
                    message_timestamp: "2020-09-17T18:22:47.088676",
                    sender_id: 2
                },
            ],
            user: {
                email: "james@gmail.com",
                first_name: "James",
                id: 2,
                location: {lat: 40.748225, lng: -73.89698620000001},
                radius: "3.00"
            },
            receiver: {
                first_name: "James",
                id: 2
            }
        }
        
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <Messages {...mockProps} />
            </CommUnityContext.Provider>
        ); 

        expect(wrapper).toMatchSnapshot();
    });
});