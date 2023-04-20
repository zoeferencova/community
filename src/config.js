const config = {
    API_ENDPOINT: process.env.REACT_APP_BASE_URL,
    SOCKET_URL: process.env.REACT_APP_SOCKET_URL,
    // API_ENDPOINT: "http://localhost:8000/api",
    // SOCKET_URL: "http://localhost:8000",
    TOKEN_KEY: process.env.TOKEN_KEY,
    GMAPS_API_KEY: process.env.REACT_APP_GMAP_API_KEY,
    GMAPS_LIBRARIES: ["places"]
}

export default config;