import React, { Component } from "react";
import moment from "moment";
import tz from "moment-timezone";
import CommUnityContext from "../../contexts/context";
import styles from "../MessageLayout/MessageLayout.module.css";
import { ProfilePicture } from "../Utils/Utils";

export default class Messages extends Component {
    static contextType = CommUnityContext;

    constructor(props) {
        super(props)
        this.scrollDown = this.scrollDown.bind(this)
    }

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

    findLastThreadMsg(messages, msg, i) {
        if (i === messages.length-1) {
            return true;
        } else if (i < messages.length-1 && msg.sender_id !== messages[i+1].sender_id) {
            return true;
        } else {
            return false;
        }
    }

    makeMessages = () => {
        const { messages, user, receiver } = this.props;
        if (messages !== undefined) {
            return messages.map((msg, i)=> {
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

    makeTypingUsers = () => {
        const { typingUsers } = this.props;
        return typingUsers.map(u => {
            return (
                <div key={u.first_name} className={styles.typingUser}>
                    {`${u.first_name} is typing...`}
                </div>
            )
        })
    }
    
    render() {
        return (
            <div ref="container" className={styles.threadContainer}>
                <div className={styles.thread}>
                    {this.makeMessages()}
                    {/* {this.makeTypingUsers()} */}
                </div>
            </div>
        )
    }
}