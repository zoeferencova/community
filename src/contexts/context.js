import React from "react";

const CommUnityContext = React.createContext({
    user: {},
    user_posts: [],
    neighborhood_posts: [],
    chats: [],
    socket: null,
    activeChat: null,
    timeZone: null,
    getAllPosts: () => {},
    addNewPost: () => {},
    updatePost: () => {},
    removePost: () => {},
    updateUser: () => {},
    addNewMessage: () => {},
    addNewChat: () => {},
    removeChat: () => {},
    updateActiveChat: () => {},
    logout: () => {},
    loading: null
})

export default CommUnityContext;