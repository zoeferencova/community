import React, { useEffect, useRef } from "react";
import { PropTypes } from 'prop-types';
import styles from "../MessageLayout/MessageLayout.module.css";
import { ProfilePicture } from "../Utils/Utils";
import { DateTime } from 'luxon'

const Messages = ({ messages, user, receiver }) => {

    const messagesEndRef = useRef(null)

    // Automatically scrolls to the bottom of the chat when component is mounted or updated
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    // Finds the last message in a thread of messages by a single user 
    // Time of the message and user's profile picture is then displayed only on last message in thread
    const findLastThreadMsg = (messages, msg, i) => i === messages.length - 1 || (i < messages.length - 1 && msg.sender_id !== messages[i + 1].sender_id);

    // Creates messages and applies styles to show who is sending which messages
    const makeMessages = () => {
        if (messages !== undefined) {
            return messages.map((msg, i) => {
                return (
                    <div key={msg.id} className={`${styles.messageContainer} ${msg.sender_id === user.id && styles.right} ${findLastThreadMsg(messages, msg, i) === true && styles.lastInThread}`}>
                        {findLastThreadMsg(messages, msg, i) && <ProfilePicture className={styles.messagePic} first_name={msg.sender_id === user.id ? user.first_name : receiver.first_name} />}
                        <div className={styles.data}>
                            <div className={styles.message}>{msg.message_content}</div>
                            {findLastThreadMsg(messages, msg, i) && <div className={styles.time}>{DateTime.fromISO(msg.message_timestamp).toFormat("t")}</div>}
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div className={styles.threadContainer}>
            <div className={styles.thread}>
                {makeMessages()}
                <div ref={messagesEndRef}></div>
            </div>
        </div>
    )
}

Messages.propTypes = {
    messages: PropTypes.array,
    user: PropTypes.object,
    receiver: PropTypes.object
}

export default Messages;