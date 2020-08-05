import React, { Component } from "react";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageInput extends Component {
    state = {
        message: "",
        isTyping: false,
    }

    handleSubmit = e => {
        e.preventDefault();
        this.sendMessage();
        this.setState({ message: "" })
    }

    sendMessage = () => {
        this.props.sendMessage(this.state.message)
    }

    componentWillUnmount() {
        this.stopCheckingTyping()
    }

    sendTyping = () => {
        this.lastUpdateTime = Date.now()
        if (!this.state.isTyping) {
            this.setState({ isTyping: true })
            this.props.sendTyping(true)
            this.startCheckingTyping()
        }
    }

    startCheckingTyping = () => {
        this.typingInterval = setInterval(() => {
            if ((Date.now() - this.lastUpdateTime) > 300) {
                this.setState({ isTyping: false })
                this.stopCheckingTyping()
            }
        }, 300)
    }

    stopCheckingTyping = () => {
        if (this.typingInterval) {
            clearInterval(this.typingInterval)
            this.props.sendTyping(false)
        }
    }
    
    render() {
        const { message } = this.state;
        return (
            <div className={styles.messageInput}>
                <form onSubmit={this.handleSubmit} className={styles.messageForm}>
                    <input 
                        id="message" 
                        ref={"messageinput"} 
                        type="text" 
                        className={styles.formControl} 
                        value={message} 
                        autoComplete={"off"} 
                        placeholder = "Type a message..." 
                        // onKeyUp={e => {e.keyCode !== 13 && this.sendTyping()}} 
                        onChange={({target}) => {this.setState({ message: target.value })}}></input>
                    <button disabled={message.length < 1} type="submit" className={styles.send}><img className={styles.sendIcon} src="https://img.icons8.com/ios-glyphs/96/89a1fc/paper-plane.png"/></button>
                </form>
            </div>
        )
    }
}