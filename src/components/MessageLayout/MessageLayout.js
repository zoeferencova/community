import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED } from "../../message-utils/events";
import CommUnityContext from "../../contexts/context";
import MessageContainer from "../MessageContainer/MessageContainer";

import styles from "./MessageLayout.module.css";

export default class MessageLayout extends Component {   
    static contextType = CommUnityContext;
    
    state = {
        socket: null,
        user: null
    }
    
    componentDidMount() {
        this.setState({ user: this.context.user })
        // this.initSocket(this.props.user)
    }

    initSocket = user => {
        const socket = io(`http://localhost:8000`);

        socket.on("connect", () => {
            if (this.state.user) {
                this.reconnect(socket)
            } else {
                console.log("connected")
            }
        });

        socket.emit(USER_CONNECTED, user);
        this.setState({ user, socket })
    }

    reconnect = socket => {
        socket.emit(USER_CONNECTED, this.state.user, ({ isUser, user }) => {
            if (isUser) {
                this.setState({ user: null })
            } else {
                this.setUser(user)
            }
        });
    }

    render() {
        const { socket, user } = this.state;
        return (
            <div className={styles.container}>
                {this.state.user && <MessageContainer socket={socket} user={user} />}
            </div>
        );
    }
}