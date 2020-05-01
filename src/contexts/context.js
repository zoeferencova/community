import React from "react";

const CommUnityContext = React.createContext({
    users: [],
    posts: [],
    currentUser: {},
})

export default CommUnityContext;