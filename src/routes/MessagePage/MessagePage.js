import React, { Component } from "react";
import MessageLayout from "../../components/MessageLayout/MessageLayout";

export default class MessagePage extends Component {
    state = {
        mountChat: false
    }
    
    render() {
        return(
            <>
                {!this.state.mountChat && <button onClick={() => this.setState({ mountChat: true })}>Start Chat</button>}
                {this.state.mountChat && <MessageLayout title="Chat App" user={this.props.user} />}
            </>
        )
    }
}