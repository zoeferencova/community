import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageInput extends Component {
    state = {
        message: "",
    }

    handleSubmit = () => {
        this.props.sendMessage(this.state.message)
        this.setState({ message: "" })
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
                        onChange={({target}) => {this.setState({ message: target.value })}}></input>
                    <button disabled={message.length < 1} type="submit" className={styles.send}><img className={styles.sendIcon} src="https://img.icons8.com/ios-glyphs/96/89a1fc/paper-plane.png"/></button>
                </form>
            </div>
        )
    }
}

MessageInput.propTypes = {
    sendMessage: PropTypes.func
}