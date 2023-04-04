import React, { Component } from "react";
import { ButtonLight } from "../Utils/Utils";

import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
    state = {
        error: null
    }

    static getDerivedStateFromError(error) {
        return { error: error };
    }

    // Renders error boundary if error is present and regular content if not
    // Used to catch errors that prevent the displaying of each individual route in AuthenticatedApp and UnauthenticatedApp components
    render() {
        if (this.state.error) {
            return (
                <div className={styles.errorBoundary}>
                    <img src={require("../../images/error-boundary.png")} alt="Error" className={styles.image}></img>
                    <h1 className={styles.title}>Oops, something broke</h1>
                    <ButtonLight onClick={window.history.back()}>Go back</ButtonLight>
                </div>
            );
        }
        return this.props.children;
    }
};

export default ErrorBoundary;