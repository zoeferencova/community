import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED } from "../../message-utils/events";
import MessageContainer from "../MessageContainer/MessageContainer";

import styles from "./MessageLayout.module.css";

export default class MessageLayout extends Component {    
    state = {
        socket: null,
        user: null
    }
    
    componentDidMount() {
        this.initSocket(this.props.user)
    }

    initSocket = (user) => {
        const socket = io(`http://localhost:8000`);

        socket.on("connect", () => {
            console.log("connected")
        });

        socket.emit(USER_CONNECTED, user);
        this.setState({ user, socket })
    }

    render() {
        const { socket, user } = this.state;
        return (
            <div className={styles.container}>
                {this.state.socket &&
                    <MessageContainer socket={socket} user={user} />
                }
            </div>
        );
    }
}