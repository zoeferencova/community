import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ButtonLight } from "../Utils/Utils";

import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
    state = {
        error: null
    }
  
    static getDerivedStateFromError(error) {
        return { error: error };
    }

    redirect = () => {
        this.props.history.goBack()
    }
  
    render() {
        if (this.state.error) {
            return (
                <div className={styles.errorBoundary}>
                    <img src={require("../../images/error-boundary.png")} alt="Error" className={styles.image}></img>
                    <h1 className={styles.title}>Oops, something broke</h1>
                    <ButtonLight onClick={this.redirect}>Go back</ButtonLight>
                </div>
            );
        }
        return this.props.children;
    }
};

export default withRouter(ErrorBoundary);