import React, { Component } from "react";
import MessageSideBar from "../MessageSideBar/MessageSideBar";
import MessageHeading from "../MessageHeading/MessageHeading";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";
import { MESSAGE_SENT, TYPING, MESSAGE_RECEIVED, COMMUNITY_CHAT, PRIVATE_MESSAGE } from "../../message-utils/events";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageContainer extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            chats: [],
            activeChat: null
        }
    }

    // componentDidMount() {
    //     this._isMounted = true;
    //     const { socket } = this.props;
    //     this.initSocket(socket)
    // }

    componentWillUnmount() {
        this._isMounted = false;
    }

    initSocket(socket) {
        socket.emit(COMMUNITY_CHAT, this.resetChat)
        socket.on(PRIVATE_MESSAGE, this.addChat)
        socket.on("connect", () => {
            socket.emit(COMMUNITY_CHAT, this.resetChat)
        })
    }

    sendOpenPrivateMessage(receiver) {
        const { socket, user } = this.props;
        socket.emit(PRIVATE_MESSAGE, { receiver, sender: user })
    }

    resetChat = chat => {
        return this.addChat(chat, true)
    }

    addChat = (chat, reset=false) => {
        const { socket } = this.props;
        const { chats } = this.state;

        const newChats = reset ? [chat] : [...chats, chat]
        this._isMounted && this.setState({ chats: newChats, activeChat: reset ? chat : this.state.activeChat })

        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        socket.on(typingEvent, this.updateTypingInChat(chat.id))
        socket.on(messageEvent, this.addMessageToChat(chat.id))
    }

    addMessageToChat = (chatId) => {
        return message => {
            const { chats } = this.state
            let newChats = chats.map((chat) => {
                if (chat.id === chatId) 
                    chat.messages.push(message)
                return chat;
            })
            this._isMounted && this.setState({ chats: newChats })
        }
    }

    updateTypingInChat = (chatId) =>{
		return ({isTyping, user})=>{
			if(user.id !== this.props.user.id){

				const { chats } = this.state

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
                        const userIds = chat.typingUsers.map(typingUser => typingUser.id)
						if(isTyping && !userIds.includes(user.id)){
							chat.typingUsers.push(user)
						}else if(!isTyping && userIds.includes(user.id)){
							chat.typingUsers = chat.typingUsers.filter(u => u.id !== user.id)
						}
					}
					return chat
				})
				this._isMounted && this.setState({chats:newChats})
			}
		}
	}

    setActiveChat = activeChat => {
        this._isMounted && this.setState({ activeChat })
    }

    sendMessage = (chatId, message) => {
        const { socket } = this.props;
        socket.emit(MESSAGE_SENT, { chatId, message })
    }

    sendTyping = (chatId, isTyping) => {
        const { socket } = this.props;
        socket.emit(TYPING, { chatId, isTyping })
    }
    
    render() {
        const { user } = this.props;
        const { chats, activeChat } = this.state;
        return (
            <div className={styles.container}>
                <MessageSideBar chats={chats} user={user} activeChat={activeChat} setActiveChat={this.setActiveChat} />
                <div className={styles.chatRoomContainer}>
                    {
                        activeChat !== null ? (
                            <div className={styles.chatRoom}>
                                <MessageHeading name={activeChat.name} />
                                <Messages messages={activeChat.messages} user={user} typingUsers={activeChat.typingUsers} />
                                <MessageInput sendMessage={message => this.sendMessage(activeChat.id, message)} sendTyping={isTyping => this.sendTyping(activeChat.id, isTyping)} />
                            </div>
                        )
                        : 
                        <div className={`${styles.chatRoom} ${styles.choose}`}>
                            <h3>Choose a chat!</h3>
                        </div>
                    }
                </div>
            </div>
        )
    }
}