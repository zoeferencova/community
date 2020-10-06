import React, { Component } from "react";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import MessageSideBar from "../MessageSideBar/MessageSideBar";
import MessageHeading from "../MessageHeading/MessageHeading";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";
import { MESSAGE_SENT } from "../../message-utils/events";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageContainer extends Component {
    static contextType = CommUnityContext;

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            chats: [],
            mobileDisplay: null
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ chats: this.context.chats, mobileDisplay: this.context.activeChat === null ? "contacts" : "chats" })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // Updates active chat when chat is clicked
    setActiveChat = activeChat => {
        this.context.updateActiveChat(activeChat.id)
    }

    // Changes mobileDisplay to "contacts" in state which applies a class that only shows the contacts screen for mobile screen sizes
    // Makes activeChat null because no chat is being displayed
    mobileDisplayContacts = () => {
        this.setState({ mobileDisplay: "contacts" })
        this.context.updateActiveChat(null)
    }

    // Posts new message to server and emits MESSAGE_SENT event to web socket which pushes new message to receiver
    sendMessage = (chatId, messageContent) => {
        const message = { chat_id: chatId, sender_id: this.context.user.id, message_content: messageContent }
        const { activeChat, user } = this.context;
        const receiver = activeChat.user1.id === user.id ? activeChat.user2 : activeChat.user1;
        ChatService.postMessage(message)
            .then(msg => {
                this.context.addNewMessage(msg, chatId)
                this.context.socket.emit(MESSAGE_SENT, { sender: user, receiverId: receiver.id, message: msg })
            })
    }
    
    render() {
        const { user, activeChat } = this.context;
        const { chats } = this.state;

        return (
            <div className={styles.container}>
                {(this.state.chats) && <>
                <MessageSideBar mobileDisplay={this.state.mobileDisplay === "contacts" ? true : false} chats={chats} user={user} activeChat={activeChat} setActiveChat={this.setActiveChat} />
                <div className={`${styles.chatRoomContainer} ${this.state.mobileDisplay === "chats" ? styles.activeMobile : styles.inactiveMobile}`}>
                    {
                        activeChat !== null ? (
                            <div className={styles.chatRoom}>
                                <MessageHeading mobileDisplayContacts={this.mobileDisplayContacts} chatId={activeChat.id} receiver={activeChat.user1.id === user.id ? activeChat.user2 : activeChat.user1}/>
                                <Messages messages={activeChat.messages} receiver={activeChat.user1.id === user.id ? activeChat.user2 : activeChat.user1} user={user} />
                                <MessageInput sendMessage={message => this.sendMessage(activeChat.id, message)} />
                            </div>
                        )
                        : 
                        <div className={`${styles.chatRoom} ${styles.choose}`}>
                            <h3><i className="fas fa-arrow-left"></i> Choose a chat!</h3>
                        </div>
                    }
                </div>
                </>}
            </div>
        )
    }
}