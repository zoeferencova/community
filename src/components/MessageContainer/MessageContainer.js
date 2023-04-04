import React, { useContext, useState, useEffect } from "react";
import ChatService from "../../services/chat-service";
import CommUnityContext from "../../contexts/context";
import MessageSideBar from "../MessageSideBar/MessageSideBar";
import MessageHeading from "../MessageHeading/MessageHeading";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";
import { MESSAGE_SENT } from "../../message-utils/events";
import styles from "../MessageLayout/MessageLayout.module.css";

const MessageContainer = () => {
    const communityContext = useContext(CommUnityContext);

    const [chats, setChats] = useState([])
    const [mobileDisplay, setMobileDisplay] = useState(null)

    useEffect(() => {
        setChats(communityContext.chats)
        setMobileDisplay(!communityContext.activeChat ? "contacts" : "chats")
    }, [communityContext.chats, communityContext.activeChat])

    // Updates active chat when chat is clicked
    const setActiveChat = activeChat => {
        communityContext.updateActiveChat(activeChat.id)
    }

    // Changes mobileDisplay to "contacts" in state which applies a class that only shows the contacts screen for mobile screen sizes
    // Makes activeChat null because no chat is being displayed
    const mobileDisplayContacts = () => {
        setMobileDisplay("contacts")
        communityContext.updateActiveChat(null)
    }

    // Posts new message to server and emits MESSAGE_SENT event to web socket which pushes new message to receiver
    const sendMessage = (chatId, messageContent) => {
        const message = { chat_id: chatId, sender_id: communityContext.user.id, message_content: messageContent }
        const { activeChat, user } = communityContext;
        const receiver = activeChat.user1.id === user.id ? activeChat.user2 : activeChat.user1;
        ChatService.postMessage(message)
            .then(msg => {
                communityContext.addNewMessage(msg, chatId)
                communityContext.socket.emit(MESSAGE_SENT, { sender: user, receiverId: receiver.id, message: msg })
            })
    }

    const { user, activeChat } = communityContext;
    const receiver = activeChat ? activeChat.user1.id === user.id ? activeChat.user2 : activeChat.user1 : null;

    return (
        <div className={styles.container}>
            {chats && <>
                <MessageSideBar mobileDisplay={mobileDisplay === "contacts"} chats={chats} user={user} activeChat={activeChat} setActiveChat={setActiveChat} />
                <div className={`${styles.chatRoomContainer} ${mobileDisplay === "chats" ? styles.activeMobile : styles.inactiveMobile}`}>
                    {
                        activeChat ? (
                            <div className={styles.chatRoom}>
                                <MessageHeading mobileDisplayContacts={mobileDisplayContacts} chatId={activeChat.id} receiver={receiver} />
                                <Messages messages={activeChat.messages} receiver={receiver} user={user} />
                                <MessageInput sendMessage={message => sendMessage(activeChat.id, message)} />
                            </div>
                        )
                            :
                            <div className={`${styles.chatRoom} ${styles.choose}`}>
                                <h3>No conversation selected</h3>
                            </div>
                    }
                </div>
            </>}
        </div>
    )
}

export default MessageContainer;