import React, { useState } from "react";
import { PropTypes } from 'prop-types';
import styles from "../MessageLayout/MessageLayout.module.css";

const MessageInput = ({ sendMessage }) => {
    const [message, setMessage] = useState("")

    // Calls sendMessage function with message value and clears message input
    const handleSubmit = e => {
        e.preventDefault();
        sendMessage(message)
        setMessage("")
    }

    const handleMessageChange = messageContent => setMessage(messageContent)

    return (
        <div className={styles.messageInput}>
            <form onSubmit={e => handleSubmit(e)} className={styles.messageForm}>
                <input
                    id="message"
                    type="text"
                    className={styles.formControl}
                    value={message}
                    autoComplete={"off"}
                    placeholder="Type a message..."
                    onChange={e => handleMessageChange(e.target.value)}></input>
                <button disabled={message.length < 1} type="submit" className={styles.send}><img className={styles.sendIcon} src="https://img.icons8.com/ios-glyphs/96/89a1fc/paper-plane.png" alt="send icon" /></button>
            </form>
        </div>
    )

}

MessageInput.propTypes = {
    sendMessage: PropTypes.func,
}

export default MessageInput;