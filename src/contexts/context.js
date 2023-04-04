import React from "react";

const CommUnityContext = React.createContext({
    user: {},
    user_posts: [],
    neighborhood_posts: [],
    chats: [],
    socket: null,
    activeChat: null,
    timeZone: null,
    getAllPosts: () => { },
    addNewPost: () => { },
    updatePost: () => { },
    removePost: () => { },
    updateUser: () => { },
    addNewMessage: () => { },
    addNewChat: () => { },
    removeChat: () => { },
    updateActiveChat: () => { },
    updateSuccessMessage: () => { },
    logout: () => { },
    loading: null,
    success: null,
    isLoaded: null
})

export default CommUnityContext;