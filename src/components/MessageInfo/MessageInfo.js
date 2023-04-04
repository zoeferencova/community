import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ButtonLight, ButtonDark } from "../Utils/Utils";
import styles from "./MessageInfo.module.css";

const MessageInfo = ({ user, deleteChat, loading }) => {
    const communityContext = useContext(CommUnityContext);

    const navigate = useNavigate();

    // Redirects user to the post that originated the chat
    const handleGoToPost = (e, post) => {
        e.preventDefault();
        post.user_id === communityContext.user.id ? navigate(`/my-post/${post.id}`) : navigate(`/post/${post.id}`)
    }

    // Formats information sentence based on type of post and whether the post was written by the current user or the other user in the chat
    const formatSentence = (post, user) => {
        if (post.user_id === communityContext.user.id) {
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

    const { post } = communityContext.activeChat;

    return (
        <div className={styles.container}>
            <p>{formatSentence(post, user)}<span>{post.post_type === "offer" ? <i className={`fas fa-heart ${styles.heart}`}></i> : <i className={`fas fa-hand-paper ${styles.hand}`}></i>}</span></p>
            <div className={styles.buttons}>
                <ButtonDark type="button" onClick={e => handleGoToPost(e, post)} id="post-button">Go to post</ButtonDark>
                <ButtonLight className={styles.deleteButton} type="button" onClick={e => deleteChat(e)} loading={loading.toString()} id="delete-button">Delete chat</ButtonLight>
            </div>
        </div>
    );
}

export default MessageInfo;

MessageInfo.propTypes = {
    user: PropTypes.object,
    deleteChat: PropTypes.func,
    loading: PropTypes.bool
}