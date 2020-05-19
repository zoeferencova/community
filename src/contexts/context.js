import React from "react";

const CommUnityContext = React.createContext({
    user: {},
    user_posts: [],
    neighborhood_posts: [],
    updateUser: () => {},
    
})

export default CommUnityContext;