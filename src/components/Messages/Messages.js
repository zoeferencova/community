import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import styles from "../MessageLayout/MessageLayout.module.css";
import { ProfilePicture } from "../Utils/Utils";

const moment = require('moment-timezone');

export default class Messages extends Component {
    static contextType = CommUnityContext;

    constructor(props) {
        super(props)
        this.scrollDown = this.scrollDown.bind(this)
    }

    // Automatically scrolls to the bottom of the chat when component is mounted or updated
    scrollDown() {
        const { container } = this.refs;
        container.scrollTop = container.scrollHeight;
    }

    componentDidMount() {
        this.scrollDown()
    }
    
    componentDidUpdate() {
        this.scrollDown()
    }

    // Finds the last message in a thread of messages by a single user 
    // Time of the message and user's profile picture is then displayed only on last message in thread
    findLastThreadMsg(messages, msg, i) {
        if (i === messages.length-1) {
            return true;
        } else if (i < messages.length-1 && msg.sender_id !== messages[i+1].sender_id) {
            return true;
        } else {
            return false;
        }
    }

    // Creates messages and applies styles to show who is sending which messages
    makeMessages = () => {
        const { messages, user, receiver } = this.props;
        if (messages !== undefined) {
            return messages.map((msg, i)=> {
                // Uses moment library to make sure that timestamp is shown in user's timezone
                const timezoneTimestamp = moment.tz(msg.message_timestamp, 'UTC').clone().tz(this.context.timeZone)
                return (
                    <div key={msg.id} className={`${styles.messageContainer} ${msg.sender_id === user.id && styles.right} ${this.findLastThreadMsg(messages, msg, i) === true && styles.lastInThread}`}>
                        {this.findLastThreadMsg(messages, msg, i) && <ProfilePicture className={styles.messagePic} first_name={msg.sender_id === user.id ? user.first_name : receiver.first_name} />}
                        <div className={styles.data}>
                            <div className={styles.message}>{msg.message_content}</div>
                            {this.findLastThreadMsg(messages, msg, i) && <div className={styles.time}>{timezoneTimestamp.format("h:mm A")}</div>}
                        </div>
                    </div>
                )
            })
        }
    }
    
    render() {
        return (
            <div ref="container" className={styles.threadContainer}>
                <div className={styles.thread}>
                    {this.makeMessages()}
                </div>
            </div>
        )
    }
}

Messages.propTypes = {
    messages: PropTypes.array,
    user: PropTypes.object,
    receiver: PropTypes.object
}