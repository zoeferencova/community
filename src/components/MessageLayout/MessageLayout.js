import React from "react";
import MessageContainer from "../MessageContainer/MessageContainer";

import styles from "./MessageLayout.module.css";

const MessageLayout = () => {
    return (
        <div className={styles.outerContainer}>
            <MessageContainer />
        </div>
    );
}

export default MessageLayout;