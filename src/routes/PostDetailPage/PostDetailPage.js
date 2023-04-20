import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CHAT_STARTED, MESSAGE_SENT } from "../../message-utils/events";
import { ButtonDark, ButtonLight, circleIcon, messageIconHollow } from "../../components/Utils/Utils";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import Task from "../../components/Task/Task";
import GoogleMap from "../../components/GoogleMaps/GoogleMaps";
import { Textarea, Container } from "../../components/Utils/Utils";

import styles from "./PostDetailPage.module.css";


const PostDetailPage = props => {
    const communityContext = useContext(CommUnityContext);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    // Finds post based on id provided in URL parameter
    const findPost = () => {
        const postId = parseFloat(id);
        return communityContext.neighborhood_posts.find(post => post.id === postId)
    }

    // Handles form submission, throwing error if there is no message present
    // Sends post request to server to post new chat
    // Fires CHAT_STARTED event to socket which pushes new chat to receiver
    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true)

        const post = findPost();
        const messageContent = e.target.message.value;

        if (!messageContent.length) {
            setError("Please enter a message")
            setLoading(false)
        } else {
            const receiverId = post.user_id;
            const newChat = { user2Id: receiverId, postId: post.id }
            ChatService.postChat(newChat)
                .then(chat => {
                    setLoading(false)
                    navigate("/messages")
                    communityContext.addNewChat(chat)
                    communityContext.socket.emit(CHAT_STARTED, { receiverId, chat })
                    const newMessage = { message_content: messageContent, chat_id: chat.id }
                    ChatService.postMessage(newMessage)
                        .then(message => {
                            communityContext.addNewMessage(message, message.chat_id)
                            communityContext.socket.emit(MESSAGE_SENT, { sender: communityContext.user, receiverId, message })
                        })
                })
        }
    }

    // Updates the activeChat to the chat associated with the post
    // Pushes the location to the messages page
    const goToMessages = chat => {
        communityContext.updateActiveChat(chat.id)
        navigate("/messages")
    }

    const post = findPost();

    return (
        <Container style={{ paddingTop: 0 }}>
            {post && <>
                <div className={styles.map}>
                    <GoogleMap className={styles.gmap} userLocation={post.location} radius={parseFloat(post.radius)} displayMarker={false} />
                </div>
                <div className={styles.details}>
                    <div className={styles.postHeader}>
                        <h3 className={styles.postTitle}>Respond to {post.first_name}'s {post.post_type}</h3>
                        {post.post_type === "request" && <span className={`${styles.urgency} ${styles[post.urgency]}`}>{circleIcon}{post.urgency}</span>}
                    </div>
                    {post.description && <p className={styles.description}>{post.description}</p>}
                    <ul className={styles.tasks}>
                        {post.categories.map(task => <Task key={task} task={task} />)}
                    </ul>
                    <div className={styles.messageSection}>
                        {!communityContext.chats.find(chat => chat.user1.id === post.user_id || chat.user2.id === post.user_id) ?
                            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                                <label htmlFor="message">Write a message</label>
                                <Textarea id="message" className={`${styles.textarea} ${error && styles.errorCell}`} placeholder={`Hi ${post.first_name}...`}></Textarea>
                                {error && <div className={styles.error}>{error}</div>}
                                <div className={styles.buttonSection}>
                                    <ButtonLight type="button" onClick={() => navigate(-1)}>Back</ButtonLight>
                                    <ButtonDark type="submit" className={styles.submitButton} loading={loading.toString()}>Send Message</ButtonDark>
                                </div>
                            </form>
                            :
                            <>
                                <p className={styles.chatMessage}>{messageIconHollow} You have a chat with {post.first_name}</p>
                                <div className={styles.buttonSection}>
                                    <ButtonLight type="button" onClick={() => navigate("/home")}>Back</ButtonLight>
                                    <ButtonDark type="button" onClick={() => goToMessages(communityContext.chats.find(chat => chat.user1.id === post.user_id || chat.user2.id === post.user_id))}>Go to chat</ButtonDark>
                                </div>
                            </>
                        }
                    </div>
                </div>


            </>}
        </Container>
    )
}

export default PostDetailPage;