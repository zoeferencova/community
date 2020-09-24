import React, { Component } from "react";

export default class ErrorBoundary extends Component {
    state = {
        error: null
    }
  
    static getDerivedStateFromError(error) {
        return { error: error };
    }
  
    render() {
        if (this.state.error) {
            return <p>Something broke on the map</p>;
        }
        return this.props.children;
    }
};