import React, { Component } from "react";
import CommUnityContext from "../../contexts/context";
import { ProfilePicture } from "../../components/Utils/Utils";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageSideBar extends Component {
    static contextType = CommUnityContext;

    makeChats = () => {
        const { chats, activeChat, setActiveChat } = this.props;
        const sortedChats = chats.sort((a, b) => {
            if (b.messages === undefined || a.messages === undefined) {
                return -1
            } else if (b.messages[b.messages.length - 1].message_timestamp < a.messages[a.messages.length - 1].message_timestamp) {
                return -1
            } else if (b.messages[b.messages.length - 1].message_timestamp > a.messages[a.messages.length - 1].message_timestamp) {
                return 1
            }
            return null;
        })

        return sortedChats.map(chat => {
            const lastMessage = chat.messages ? chat.messages[chat.messages.length - 1] : "";
            
            const user = chat.user1.id === this.context.user.id ? chat.user2 : chat.user1;
            const classNames = (activeChat && activeChat.id === chat.id) ? styles.active : ""
            return (
                <div key={chat.id} className={`${styles.user} ${classNames}`} onClick={() => { setActiveChat(chat) }}>
                    <ProfilePicture className={styles.sidebarPic} first_name={user.first_name} />
                    <div className={styles.userInfo}>
                        <div className={styles.name}>{user.first_name}</div>
                        {lastMessage && <div className={styles.lastMessage}>{lastMessage.message_content}</div>}
                    </div>
                </div>
            )
        })
    }

    render() {
        const { setActiveChat } = this.props;
        return (
            <div id="side-bar" className={`${styles.sideBar} ${this.props.mobileDisplay === true ? styles.activeMobile : styles.inactiveMobile}`}>
                <div className={styles.heading}>
                    <div className={styles.chatName}>Chats</div>
                </div>
                <div className={styles.users} ref="users" onClick={e => {(e.target === this.refs.user) && setActiveChat(null)}}>
                    {this.makeChats()}
                </div>
            </div>
        )
    }
}