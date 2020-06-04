import React, { Component } from "react";
import CommUnityContext from "../../contexts/context";
import MessageContainer from "../MessageContainer/MessageContainer";

import styles from "./MessageLayout.module.css";

export default class MessageLayout extends Component {   
    static contextType = CommUnityContext;

    render() {
        return (
            <div className={styles.container}>
                <MessageContainer />
            </div>
        );
    }
}