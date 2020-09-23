import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { CHAT_STARTED, MESSAGE_SENT } from "../../message-utils/events";
import { ButtonDark, ButtonLight } from "../../components/Utils/Utils";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import Task from "../../components/Task/Task";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import { Textarea } from "../../components/Utils/Utils";

import styles from "./PostDetailPage.module.css";


class PostDetailPage extends Component {
    static contextType = CommUnityContext;

    state = { 
        error: null,
        loading: false
    }
    
    findPost() {
        const postId = parseFloat(this.props.match.params.id);
        return this.context.neighborhood_posts.find(post => post.id === postId)
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({...this.state, loading: true })

        const post = this.findPost();
        const messageContent = e.target.message.value;

        if (!messageContent.length) {
            this.setState({ error: "Please enter a message", loading: false })
        } else {
            const receiverId = post.user_id;
            const newChat = { user2Id: receiverId, postId: post.id }
            ChatService.postChat(newChat)
                .then(chat => {
                    this.setState({...this.state, loading: false })
                    this.props.history.push("/messages")
                    this.context.addNewChat(chat)
                    this.context.socket.emit(CHAT_STARTED, { receiverId, chat })
                    const newMessage = { message_content: messageContent, chat_id: chat.id  }
                    ChatService.postMessage(newMessage)
                        .then(message => {
                            this.context.addNewMessage(message, message.chat_id)
                            this.context.socket.emit(MESSAGE_SENT, { sender: this.context.user, receiverId, message })
                        })
                })
        }
    }

    goToMessages = chat => {
        this.context.updateActiveChat(chat.id)
        this.props.history.push("/messages")
    }

    render() {
        const post = this.findPost();

        return (   
            <main className={styles.main}>
                {post && <>
                    <div className={styles.map}>
                        <GoogleMap className={styles.gmap} location={post.location} radius={post.radius} displayMarker={false} />
                    </div>
                    <div className={styles.postHeader}>
                        <h3 className={styles.postTitle}>Respond to {post.first_name}'s {post.post_type}</h3>
                        {post.post_type === "request" && <span className={styles[post.urgency]}><i className="fas fa-circle"></i> {post.urgency} urgency</span>}
                    </div>
                    <ul className={styles.tasks}>
                        {post.categories.map(task => <Task key={task} task={task} />)}
                    </ul>
                    {post.description && <p className={styles.description}>{post.description}</p>}
                    <div className={styles.messageSection}>
                        {!this.context.chats.find(chat => chat.user1.id === post.user_id || chat.user2.id === post.user_id) ?
                            <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                                <label htmlFor="message">Write a message</label>
                                <Textarea id="message" className={`${styles.textarea} ${this.state.error && styles.errorCell}`} placeholder={`Hi ${post.first_name}...`}></Textarea>
                                {this.state.error && <div className={styles.error}>{this.state.error}</div>}
                                <div className={styles.buttonSection}>
                                    <ButtonLight type="button" onClick={() => this.props.history.goBack()}>Back</ButtonLight>
                                    <ButtonDark type="submit" className={styles.submitButton} loading={this.state.loading.toString()}>Send Message</ButtonDark>
                                </div>
                            </form>
                            :
                            <>
                                <p className={styles.chatMessage}>You have a chat with {post.first_name}</p> 
                                <div className={styles.buttonSection}>
                                        <ButtonLight type="button" onClick={() => this.props.history.goBack()}>Back</ButtonLight>
                                        <ButtonDark type="button" onClick={() => this.goToMessages(this.context.chats.find(chat => chat.user1.id === post.user_id || chat.user2.id === post.user_id))}>Go to chat</ButtonDark>
                                </div>  
                            </>
                        }
                    </div>
                    
                </>}
            </main>
        )
    }
}

export default withRouter(PostDetailPage);