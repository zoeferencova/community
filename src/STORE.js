const STORE = {
    users: [
        {
            user_id: 1,
            first_name: "Zoe",
            email: "zoeferencova@gmail.com",
            password: "Password1!",
            // does this need to be coordinates?
            location: {
                lat: 40.7450271,
                lng: -73.8858674
            },
            radius: 2
        },
        {
            user_id: 2,
            first_name: "James",
            email: "james@gmail.com",
            password: "Password2!",
            location: {
                lat: 40.7450271,
                lng: -73.8858674
            },
            radius: 3
        },
        {
            user_id: 3,
            first_name: "Robin",
            email: "robin@gmail.com",
            password: "Password3!",
            location: {
                lat: 40.7450271,
                lng: -73.8858674
            },
            radius: 1
        }
    ],
    posts: [
        {
            post_id: 1,
            user_id: 1,
            type: "offer",
            help_items: ["Running errands"],
            description: "Available to help in Queens",
            urgency: "Low",
            timestamp: Date.now(),
            // joined from users table
            first_name: "Zoe",
            location: {
                lat: 40.7450271,
                lng: -73.8858674
            },
            radius: 2
        },
        {
            post_id: 2,
            user_id: 2,
            type: "request",
            help_items: ["Running errands", "Picking up supplies"],
            description: "Need help picking up prescription",
            urgency: "Medium",
            timestamp: Date.now(),
            // joined from users table
            first_name: "James",
            location: {
                lat: 40.7450271,
                lng: -73.8858674
            },
            radius: 3
        },
        {
            post_id: 3,
            user_id: 3,
            type: "request",
            help_items: ["Online chat", "Phone call"],
            description: null,
            urgency: "Low",
            timestamp: Date.now(),
            // joined from users table
            first_name: "Robin",
            location: {
                lat: 40.7450271,
                lng: -73.8858674
            },
            radius: 1
        }
    ]
} 

export default STORE;