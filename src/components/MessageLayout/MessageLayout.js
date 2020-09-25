import React, { Component } from "react";
import MessageContainer from "../MessageContainer/MessageContainer";

import styles from "./MessageLayout.module.css";

export default class MessageLayout extends Component {   
   render() {
        return (
            <div className={styles.container}>
                <MessageContainer />
            </div>
        );
    }
}