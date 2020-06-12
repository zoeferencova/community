import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import styles from "./MessageInfo.module.css";

class MessageInfo extends Component {
    static contextType = CommUnityContext;

    handleGoToPost(e, post) {
        e.preventDefault();
        if (post.user_id === this.context.user.id) {
            this.props.history.push(`/my-post/${post.id}`)
        } else {
            this.props.history.push(`/post/${post.id}`)
        }
        
    }

    formatSentence(post, user) {
        if (post.user_id === this.context.user.id) {
            if (post.post_type === "offer") {
                return `${user.first_name} offered to help you`
            } else {
                return `You accepted help from ${user.first_name}`
            }
        } else if (post.user_id === user.id) {
            if (post.post_type === "offer") {
                return `${user.first_name} offered to help you`
            } else {
                return `You offered to help ${user.first_name}`
            }
        }
    }

    render() {
        const { post } = this.context.activeChat;
        const { user } = this.props;
        return (
            <div className={styles.container}>
                <p>{this.formatSentence(post, user)}</p>
                <div className={styles.buttons}>
                    <button type="button" onClick={e => this.handleGoToPost(e, post)}>Go to post</button>
                    <button type="button" onClick={e => this.props.deleteChat(e)}>Delete chat</button>
                </div>
            </div>
        );
    }
}

export default withRouter(MessageInfo)