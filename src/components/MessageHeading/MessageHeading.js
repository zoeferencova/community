import React, { useContext, useState } from "react";
import { PropTypes } from 'prop-types';
import { CHAT_DELETED } from "../../message-utils/events";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import MessageInfo from "../MessageInfo/MessageInfo";
import { chatBackIcon, infoIcon, ProfilePicture, xIcon } from "../Utils/Utils";
import styles from "../MessageLayout/MessageLayout.module.css";

const MessageHeading = ({ receiver, mobileDisplayContacts }) => {
    const communityContext = useContext(CommUnityContext);

    const [infoOpen, setInfoOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Displays a window popup confirming that chat is to be deleted
    // Deletes chat that is currently set to activeChat if confirmed
    // Removes chat in context and emits CHAT_DELETED event to socket which pushes chat deletion to the other member of the chat
    // Sets activeChat in context to null
    const handleDelete = e => {
        e.preventDefault()

        setLoading(true)

        const chatId = communityContext.activeChat.id;
        if (window.confirm('Are you sure you want to delete this chat? Your message history will be lost.')) {
            ChatService.deleteChat(chatId)
                .then(res => {
                    setLoading(false)
                    communityContext.removeChat(chatId)
                    communityContext.socket.emit(CHAT_DELETED, { chatId: chatId, receiverId: receiver.id })
                })
                .then(res => {
                    communityContext.updateActiveChat(null)
                })
        }
    }

    // Sets activeChat in context to null which closes the currently opened chat
    const handleClose = () => communityContext.updateActiveChat(null)

    // Toggles the message info display
    const toggleInfo = () => setInfoOpen(!infoOpen)

    return (
        <div className={styles.headerContainer}>
            <div className={styles.chatHeader}>
                <div className={styles.userInfo}>
                    <button className={styles.chatBackArrow} onClick={mobileDisplayContacts}>{chatBackIcon}</button>
                    <ProfilePicture className={styles.headerPic} first_name={receiver.first_name} />
                    <div className={styles.userName}>{receiver.first_name}</div>
                    <div className={styles.status}>
                        <div className={styles.indicator}></div>
                    </div>
                </div>
                <div className={styles.options}>
                    <button onClick={toggleInfo}>{infoIcon}</button>
                    <button onClick={handleClose}>{xIcon}</button>
                </div>
            </div>
            {infoOpen && <MessageInfo user={receiver} deleteChat={handleDelete} loading={loading} />}
        </div>
    );
}

MessageHeading.propTypes = {
    receiver: PropTypes.object,
    mobileDisplayContacts: PropTypes.func
}

export default MessageHeading;