import React, { Component } from "react";

import styles from "./MapErrorBoundary.module.css";

export default class ErrorBoundary extends Component {
    state = {
        error: null
    }
  
    static getDerivedStateFromError(error) {
        return { error: error };
    }
  
    // Renders error boundary if error is present and regular map content if not
    // Created a separate error boundary for the map widgets in case something breaks that is out of our control
    render() {
        if (this.state.error) {
            return (
                <div className={styles.errorBoundary}>
                    <img src={require("../../images/map-error.png")} alt="map error" className={styles.image}></img>
                    <p>There was an error loading the map</p>
                </div>
            );
        }
        return this.props.children;
    }
};