import React, { Component } from "react";
import MessageLayout from "../../components/MessageLayout/MessageLayout";

export default class MessagePage extends Component { 
    render() {
        return(
            <MessageLayout title="Chat App" user={this.props.user} />
        )
    }
}