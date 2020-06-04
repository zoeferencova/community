import React, { Component } from "react";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import MessageSideBar from "../MessageSideBar/MessageSideBar";
import MessageHeading from "../MessageHeading/MessageHeading";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";
import { MESSAGE_SENT, TYPING } from "../../message-utils/events";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageContainer extends Component {
    static contextType = CommUnityContext;

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            chats: [],
            activeChat: null
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ chats: this.context.chats, activeChat: this.context.chats[0] })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateTypingInChat = (chatId) =>{
		return ({isTyping, user})=>{
			if (user.id !== this.context.user.id) {

				const { chats } = this.state

				let newChats = chats.map((chat) => {
					if (chat.id === chatId) {
                        const userIds = chat.typingUsers.map(typingUser => typingUser.id)
						if (isTyping && !userIds.includes(user.id)) {
							chat.typingUsers.push(user)
						} else if(!isTyping && userIds.includes(user.id)) {
							chat.typingUsers = chat.typingUsers.filter(u => u.id !== user.id)
						}
					}
					return chat
				})
				this._isMounted && this.setState({ chats: newChats })
			}
		}
	}

    setActiveChat = activeChat => {
        this.setState({ activeChat })
    }

    sendMessage = (chatId, messageContent) => {
        const message = { chat_id: chatId, sender_id: this.context.user.id, message_content: messageContent }
        const { activeChat } = this.state;
        const { user } = this.context;
        const receiver = activeChat.user1.id === user.id ? activeChat.user2 : activeChat.user1;
        ChatService.postMessage(message)
            .then(msg => {
                this.context.addNewMessage(msg, chatId)
                this.context.socket.emit(MESSAGE_SENT, { sender: user, receiverId: receiver.id, message: msg })
            })
    }

    sendTyping = (chatId, isTyping) => {
        const { socket } = this.context;
        socket.emit(TYPING, { chatId, isTyping })
    }
    
    render() {
        const { user } = this.context;
        const { activeChat, chats } = this.state;
        return (
            <div className={styles.container}>
                {(this.state.chats && this.state.activeChat) && <>
                <MessageSideBar chats={chats} user={user} activeChat={activeChat} setActiveChat={this.setActiveChat} />
                <div className={styles.chatRoomContainer}>
                    {
                        activeChat !== null ? (
                            <div className={styles.chatRoom}>
                                <MessageHeading chatId={activeChat.id} receiver={activeChat.user1.id === user.id ? activeChat.user2 : activeChat.user1}/>
                                <Messages messages={activeChat.messages} receiver={activeChat.user1.id === user.id ? activeChat.user2 : activeChat.user1} user={user} typingUsers={activeChat.typingUsers} />
                                <MessageInput sendMessage={message => this.sendMessage(activeChat.id, message)} sendTyping={isTyping => this.sendTyping(activeChat.id, isTyping)} />
                            </div>
                        )
                        : 
                        <div className={`${styles.chatRoom} ${styles.choose}`}>
                            <h3>Choose a chat!</h3>
                        </div>
                    }
                </div>
                </>}
            </div>
        )
    }
}