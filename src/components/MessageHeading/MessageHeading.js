import React from "react";
import styles from "../MessageLayout/MessageLayout.module.css";

export default function({ name }) {
    return (
        <div className={styles.chatHeader}>
            <div className={styles.userInfo}>
                <div className={styles.userName}>{name}</div>
                <div className={styles.status}>
                    <div className={styles.indicator}></div>
                </div>
            </div>
            <div className={styles.options}></div>
        </div>
    );
}