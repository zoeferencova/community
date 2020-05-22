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

    sendTyping = () => {

    }
    
    render() {
        const { message } = this.state;

        return (
            <div className={styles.messageInput}>
                <form onSubmit={this.handleSubmit} className={styles.messageForm}>
                    <input id="message" ref={"messageinput"} type="text" className={styles.formControl} value={message} autoComplete={"off"} placeholder = "Type something here" onKeyUp={e => {e.keyCode !== 13 && this.sendTyping()}} onChange={({target}) => {this.setState({ message: target.value })}}></input>
                    <button disabled={message.length < 1} type="submit" className={styles.send}>Send</button>
                </form>
            </div>
        )
    }
}