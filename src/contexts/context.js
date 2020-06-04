import React from "react";

const CommUnityContext = React.createContext({
    user: {},
    user_posts: [],
    neighborhood_posts: [],
    chats: [],
    socket: null,
    getAllPosts: () => {},
    addNewPost: () => {},
    updatePost: () => {},
    removePost: () => {},
    updateUser: () => {},
    addNewMessage: () => {},
    addNewChat: () => {},
    removeChat: () => {},
    logout: () => {},
})

export default CommUnityContext;