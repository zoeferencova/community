import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { CHAT_DELETED } from "../../message-utils/events";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import MessageInfo from "../MessageInfo/MessageInfo";
import { ProfilePicture } from "../Utils/Utils";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageHeading extends Component {
    static contextType = CommUnityContext;

    state = {
        infoOpen: false,
        loading: false
    }
    
    // Displays a window popup confirming that chat is to be deleted
    // Deletes chat that is currently set to activeChat if confirmed
    // Removes chat in context and emits CHAT_DELETED event to socket which pushes chat deletion to the other member of the chat
    // Sets activeChat in context to null
    handleDelete = e => {
        e.preventDefault()

        this.setState({...this.state, loading: true })

        const chatId = this.context.activeChat.id;
        if (window.confirm('Are you sure you want to delete this chat? Your message history will be lost.')) {
            ChatService.deleteChat(chatId)
                .then(res => {
                    this.setState({...this.state, loading: false })
                    this.context.removeChat(chatId)
                    this.context.socket.emit(CHAT_DELETED, { chatId: chatId, receiverId: this.props.receiver.id })
                })
                .then(res => {
                    this.context.updateActiveChat(null)
                })
        }
    }

    // Sets activeChat in context to null which closes the currently opened chat
    handleClose(e) {
        e.preventDefault()
        this.context.updateActiveChat(null)
    }

    // Toggles the message info display
    toggleInfo = () => {
        this.state.infoOpen ? this.setState({ infoOpen: false }) : this.setState({ infoOpen: true })
    }

    render() {
        return (
            <div className={styles.headerContainer}>
                <div className={styles.chatHeader}>
                    <div className={styles.userInfo}>
                        <i className={`fas fa-chevron-left ${styles.chatBackArrow}`} onClick={this.props.mobileDisplayContacts}></i>
                        
                        <ProfilePicture className={styles.headerPic} first_name={this.props.receiver.first_name} />
                        <div className={styles.userName}>{this.props.receiver.first_name}</div>
                        <div className={styles.status}>
                            <div className={styles.indicator}></div>
                        </div>
                    </div>
                    <div className={styles.options}>
                        <i className="fas fa-info-circle" onClick={this.toggleInfo}></i>
                        <i className="fas fa-times" onClick={e => this.handleClose(e)}></i>
                    </div>
                </div>
                {this.state.infoOpen && <MessageInfo user={this.props.receiver} deleteChat={this.handleDelete} loading={this.state.loading} />}
            </div>
        );
    }
}

MessageHeading.propTypes = {
    receiver: PropTypes.object,
    mobileDisplayContacts: PropTypes.func
}