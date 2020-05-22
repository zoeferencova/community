import React, { Component } from "react";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class Messages extends Component {
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
        const { messages, user } = this.props;
        return messages.map(msg => {
            return (
                <div key={msg.id} className={`${styles.messageContainer} ${msg.sender.id === user.id && styles.right}`}>
                    <div className={styles.time}>{msg.time}</div>
                    <div className={styles.data}>
                        <div className={styles.message}>{msg.message}</div>
                        <div className={styles.name}>{msg.sender.name}</div>
                    </div>
                </div>
            )
        })
    }

    makeTypingUsers = () => {
        const { typingUsers } = this.props;
        return typingUsers.map(name => {
            return (
                <div key={name} className={styles.typingUser}>
                    {`${name} is typing...`}
                </div>
            )
        })
    }
    
    render() {
        return (
            <div ref="container" className={styles.threadContainer}>
                <div className={styles.thread}>
                    {this.makeMessages()}
                    {this.makeTypingUsers()}
                </div>
            </div>
        )
    }
}