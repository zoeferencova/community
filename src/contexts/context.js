import React from "react";

const CommUnityContext = React.createContext({
    user: {},
    user_posts: [],
    neighborhood_posts: [],
    chats: [],
    getAllPosts: () => {},
    addNewPost: () => {},
    updatePost: () => {},
    removePost: () => {},
    updateUser: () => {},
    addNewMessage: () => {},
    addNewChat: () => {},
    removeChat: () => {}
})

export default CommUnityContext;