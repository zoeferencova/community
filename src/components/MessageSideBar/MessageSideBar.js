import React, { Component } from "react";
import CommUnityContext from "../../contexts/context";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageSideBar extends Component {
    static contextType = CommUnityContext;

    makeChats = () => {
        const { chats, activeChat, setActiveChat } = this.props;
        return chats.map(chat => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            
            const user = chat.user1.id === this.context.user.id ? chat.user2 : chat.user1;
            console.log(user)
            const classNames = (activeChat && activeChat.id === chat.id) ? styles.active : ""

            return (
                <div key={chat.id} className={`${styles.user} ${classNames}`} onClick={() => { setActiveChat(chat) }}>
                    <div className={styles.userPhoto}>{user.first_name[0].toUpperCase()}</div>
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
            <div id="side-bar" className={styles.sideBar}>
                <div className={styles.heading}>
                    <div className={styles.appName}>Chat</div>
                    <div className={styles.menu}></div>
                </div>
                <div className={styles.users} ref="users" onClick={e => {(e.target === this.refs.user) && setActiveChat(null)}}>
                    {this.makeChats()}
                </div>
            </div>
        )
    }
}