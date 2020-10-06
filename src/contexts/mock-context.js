import moment from "moment";

const mockContext = {
    user: {
        first_name: "Zoe",
        email: "zoe@gmail.com",
        id: 1,
        location: {lat: 40.748225, lng: -73.89698620000001},
        radius: "3.00"
    },
    user_posts: [
        {
            categories: ["Phone call"],
            date_created: moment().format(),
            description: null,
            distance_from_user: "0",
            first_name: "Zoe",
            id: 1,
            location: {"lat":40.748225,"lng":-73.89698620000001},
            post_type: "request",
            radius: "3.00",
            urgency: "low",
            user_id: 1
        },
        {
            categories: ["Online chat"],
            date_created: moment().format(),
            description: null,
            distance_from_user: "0",
            first_name: "Zoe",
            id: 1,
            location: {"lat":40.748225,"lng":-73.89698620000001},
            post_type: "offer",
            radius: "3.00",
            urgency: null,
            user_id: 1
        }
    ],
    neighborhood_posts: [
        {
            categories: ["Picking up supplies"],
            date_created: moment().format(),
            description: null,
            distance_from_user: "1007",
            first_name: "James",
            id: 4,
            location: {lat: 40.7532952, lng: -73.9068973},
            post_type: "offer",
            radius: "3.00",
            urgency: null,
            user_id: 2
        },
        {
            categories: ["Dog walking", "Running errands"],
            date_created: moment().format(),
            description: null,
            distance_from_user: "2254",
            first_name: "Anna",
            id: 17,
            location: {lat: 40.7432931, lng: -73.9229366},
            post_type: "request",
            radius: "2.75",
            urgency: "medium",
            user_id: 3
        }
    ],
    chats: [
        {
            id: 25,
            messages: [
                {
                    chat_id: 25,
                    id: 285,
                    message_content: "hi",
                    message_timestamp: moment().format(),
                    sender_id: 1
                },
                {
                    chat_id: 25,
                    id: 286,
                    message_content: "hey",
                    message_timestamp: moment().format(),
                    sender_id: 2
                },
            ],
            post: {
                date_created: moment().format(),
                description: null,
                id: 4,
                post_type: "offer",
                urgency: null,
                user_id: 2
            },
            user1: {first_name: "Zoe", id: 1},
            user2: {first_name: "James", id: 2}
        }
    ],
    socket: {},
    activeChat: {
        id: 25,
        messages: [
            {
                chat_id: 25,
                id: 285,
                message_content: "hi",
                message_timestamp: moment().format(),
                sender_id: 1
            },
            {
                chat_id: 25,
                id: 286,
                message_content: "hey",
                message_timestamp: moment().format(),
                sender_id: 2
            },
        ],
        post: {
            date_created: moment().format(),
            description: null,
            id: 4,
            post_type: "offer",
            urgency: null,
            user_id: 2
        },
        user1: {
            first_name: "Zoe",
            id: 1
        },
        user2: {
            first_name: "James",
            id: 2
        }
    },
    timeZone: "America/New_York",
    getAllPosts: jest.fn(),
    addNewPost: jest.fn(),
    updatePost: jest.fn(),
    removePost: jest.fn(),
    updateUser: jest.fn(),
    addNewMessage: jest.fn(),
    addNewChat: jest.fn(),
    removeChat: jest.fn(),
    updateActiveChat: jest.fn(),
    updateSuccessMessage: jest.fn(),
    logout: jest.fn(),
    loading: false,
    succcess: null
}

export default mockContext;