import React, { Component } from "react";
import moment from "moment";
import tz from "moment-timezone";
import CommUnityContext from "../../contexts/context";
import styles from "../MessageLayout/MessageLayout.module.css";

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

    makeMessages = () => {
        const { messages, user, receiver } = this.props;
        if (messages !== undefined) {
            return messages.map(msg => {
                const timezoneTimestamp = moment.tz(msg.message_timestamp, 'UTC').clone().tz(this.context.timeZone)
                return (
                    <div key={msg.id} className={`${styles.messageContainer} ${msg.sender_id === user.id && styles.right}`}>
                        <div className={styles.time}>{timezoneTimestamp.format("h:mm A")}</div>
                        <div className={styles.data}>
                            <div className={styles.message}>{msg.message_content}</div>
                            <div className={styles.name}>{msg.sender_id === user.id ? user.first_name : receiver.first_name}</div>
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