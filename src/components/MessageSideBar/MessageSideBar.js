import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { backArrowIcon, ProfilePicture } from "../../components/Utils/Utils";
import styles from "../MessageLayout/MessageLayout.module.css";

const MessageSideBar = ({ chats, activeChat, setActiveChat, mobileDisplay }) => {
    const communityContext = useContext(CommUnityContext);

    const navigate = useNavigate();

    // Formats and creates values for the side bar, sorting chats by the most recent message and displaying the most recent message for each
    const makeChats = () => {
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

            const user = chat.user1.id === communityContext.user.id ? chat.user2 : chat.user1;
            const classNames = (activeChat && activeChat.id === chat.id) ? styles.active : ""
            return (
                <div key={chat.id} id={`chat${chat.id}`} className={`${styles.user} ${classNames}`} onClick={() => setActiveChat(chat)}>
                    <ProfilePicture className={styles.sidebarPic} first_name={user.first_name} />
                    <div className={styles.userInfo}>
                        <div className={styles.name}>{user.first_name}</div>
                        {lastMessage && <div className={styles.lastMessage}>{lastMessage.message_content}</div>}
                    </div>
                </div>
            )
        })
    }

    return (
        <div id="side-bar" className={`${styles.sideBar} ${mobileDisplay === true ? styles.activeMobile : styles.inactiveMobile}`}>
            <div className={styles.heading}>
                <button className={styles.chatName} onClick={() => navigate("/home")}>{backArrowIcon}<span>Home</span></button>
            </div>
            <div className={styles.users}>
                {makeChats()}
            </div>
        </div>
    )
}

MessageSideBar.propTypes = {
    chats: PropTypes.array,
    activeChat: PropTypes.object,
    setActiveChat: PropTypes.func,
    mobileDisplay: PropTypes.bool
}

export default MessageSideBar;