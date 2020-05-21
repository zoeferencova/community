import React from "react";

const CommUnityContext = React.createContext({
    user: {},
    user_posts: [],
    neighborhood_posts: [],
    getAllPosts: () => {},
    addNewPost: () => {},
    updatePost: () => {},
    removePost: () => {},
    updateUser: () => {},
})

export default CommUnityContext;