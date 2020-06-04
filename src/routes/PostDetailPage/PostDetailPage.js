import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { CHAT_STARTED, MESSAGE_SENT } from "../../message-utils/events";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import Task from "../../components/Task/Task";
import GoogleMap from "../../components/GoogleMap/GoogleMap";

import styles from "./PostDetailPage.module.css";


class PostDetailPage extends Component {
    static contextType = CommUnityContext;
    
    findPost() {
        const postId = parseFloat(this.props.match.params.id);
        return this.context.neighborhood_posts.find(post => post.id === postId)
    }

    handleSubmit(e) {
        e.preventDefault();
        const post = this.findPost()
        const messageContent = e.target.message.value;
        const receiverId = post.user_id;
        const newChat = { user2Id: receiverId, postId: post.id }
        ChatService.postChat(newChat)
            .then(chat => {
                this.context.addNewChat(chat)
                this.context.socket.emit(CHAT_STARTED, { receiverId, chat })
                const newMessage = { message_content: messageContent, chat_id: chat.id  }
                ChatService.postMessage(newMessage)
                    .then(message => {
                        this.context.addNewMessage(message, message.chat_id)
                        this.context.socket.emit(MESSAGE_SENT, { sender: this.context.user, receiverId, message })
                        this.props.history.push("/messages")
                    })
            })
    }

    render() {
        const post = this.findPost();
        return (   
            <main className={styles.main}>
                {post && <>
                    <h3>Respond to {post.first_name}'s {post.post_type}.</h3>
                    <h4>{post.first_name} {post.post_type === "request" ? "needs help with:" : "can help with:"}</h4>
                    <ul className={styles.tasks}>
                        {post.categories.map(task => <Task key={task} task={task} />)}
                    </ul>
                    {post.post_type === "request" && <p>Urgency: {post.urgency}</p>}
                    {post.description && <p>Description: {post.description}</p>}
                    <div className={styles.map}>
                        <GoogleMap location={post.location} radius={post.radius} displayMarker={false} />
                    </div>
                    {!this.context.chats.find(chat => chat.user1.id === post.user_id || chat.user2.id === post.user_id) ?
                        <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                            <label htmlFor="message">Write a message</label>
                            <textarea id="message" className={styles.textarea} placeholder={`Hi ${post.first_name}...`}></textarea>
                            <div>
                                <button type="button" onClick={() => this.props.history.goBack()}>Go Back</button>
                                <button type="submit">Send Message</button>
                            </div>
                        </form>
                        :
                        <>
                            <p>You have a chat with {post.first_name}</p> 
                            <div>
                                    <button type="button" onClick={() => this.props.history.goBack()}>Go Back</button>
                                    <button type="button" onClick={() => this.props.history.push("/messages")}>Go to Messages</button>
                            </div>  
                        </>
                    }
                </>}
            </main>
        )
    }
}

export default withRouter(PostDetailPage);