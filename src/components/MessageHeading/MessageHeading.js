import React, { Component } from "react";
import { CHAT_DELETED } from "../../message-utils/events";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageHeading extends Component {
    static contextType = CommUnityContext;
    
    handleDelete(e) {
        e.preventDefault()
        if (window.confirm('Are you sure you want to delete this chat? Your message history will be lost.')) {
            ChatService.deleteChat(this.props.chatId)
            .then(res => {
                this.context.updateActiveChat(null)
                this.context.removeChat(this.props.chatId)
                this.context.socket.emit(CHAT_DELETED, { chatId: this.props.chatId, receiverId: this.props.receiver.id })
            })
        }
    }

    handleClose(e) {
        e.preventDefault()
        this.context.updateActiveChat(null)
    }

    render() {
        return (
            <div className={styles.chatHeader}>
                <div className={styles.userInfo}>
                    <i className={`fas fa-chevron-left ${styles.chatBackArrow}`} onClick={this.props.mobileDisplayContacts}></i>
                    <div className={styles.userName}>{this.props.receiver.first_name}</div>
                    <div className={styles.status}>
                        <div className={styles.indicator}></div>
                    </div>
                </div>
                <div className={styles.options}>
                    <i className="fas fa-info-circle" onClick={e => this.handleDelete(e)}></i>
                    <i className="fas fa-times" onClick={e => this.handleClose(e)}></i>
                </div>
            </div>
        );
    }
}