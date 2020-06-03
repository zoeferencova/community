import React, { Component } from "react";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageHeading extends Component {
    static contextType = CommUnityContext;
    
    handleDelete(e) {
        e.preventDefault()
        ChatService.deleteChat(this.props.chatId)
            .then(res => this.context.removeChat(this.props.chatId))
    }

    render() {
        return (
            <div className={styles.chatHeader}>
                <div className={styles.userInfo}>
                    <div className={styles.userName}>{this.props.name}</div>
                    <div className={styles.status}>
                        <div className={styles.indicator}></div>
                    </div>
                </div>
                <div className={styles.options}>
                    <button type="button" onClick={e => this.handleDelete(e)}>Delete chat</button>
                </div>
            </div>
        );
    }
}