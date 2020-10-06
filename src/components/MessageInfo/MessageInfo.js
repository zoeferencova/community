import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ButtonLight, ButtonDark } from "../Utils/Utils";
import styles from "./MessageInfo.module.css";

class MessageInfo extends Component {
    static contextType = CommUnityContext;

    // Redirects user to the post that originated the chat
    handleGoToPost(e, post) {
        e.preventDefault();
        if (post.user_id === this.context.user.id) {
            this.props.history.push(`/my-post/${post.id}`)
        } else {
            this.props.history.push(`/post/${post.id}`)
        }
        
    }

    // Formats information sentence based on type of post and whether the post was written by the current user or the other user in the chat
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
                <p>{this.formatSentence(post, user)}<span>{post.post_type === "offer" ? <i className={`fas fa-heart ${styles.heart}`}></i> : <i className={`fas fa-hand-paper ${styles.hand}`}></i>}</span></p>
                <div className={styles.buttons}>
                    <ButtonDark type="button" onClick={e => this.handleGoToPost(e, post)} id="post-button">Go to post</ButtonDark>
                    <ButtonLight className={styles.deleteButton} type="button" onClick={e => this.props.deleteChat(e)} loading={this.props.loading.toString()} id="delete-button">Delete chat</ButtonLight>
                </div>
            </div>
        );
    }
}

export default withRouter(MessageInfo);

MessageInfo.propTypes = {
    user: PropTypes.object,
    deleteChat: PropTypes.func,
    loading: PropTypes.bool
}