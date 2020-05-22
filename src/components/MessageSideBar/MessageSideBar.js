import React, { Component } from "react";
import styles from "../MessageLayout/MessageLayout.module.css";

export default class MessageSideBar extends Component {
    
    makeChats = () => {
        const { chats, activeChat, setActiveChat } = this.props;
        return chats.map(chat => {
            if (chat.name) {
                const lastMessage = chat.messages[chat.messages.length - 1];
                
                const user = chat.users.find(({ id }) => {
                    return id !== this.props.user.id
                }) || { first_name: "Community" }
                
                const classNames = (activeChat && activeChat.id === chat.id) ? styles.active : ""

                return (
                    <div key={chat.id} className={`${styles.user} ${classNames}`} onClick={() => { setActiveChat(chat) }}>
                        <div className={styles.userPhoto}>{user.first_name[0].toUpperCase()}</div>
                        <div className={styles.userInfo}>
                            <div className={styles.name}>{user.first_name}</div>
                            {lastMessage && <div className={styles.lastMessage}>{lastMessage.message}</div>}
                        </div>
                    </div>
                )
            }
            return null;
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