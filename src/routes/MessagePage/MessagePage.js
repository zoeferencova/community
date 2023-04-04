import React from "react";
import { PropTypes } from 'prop-types';
import MessageLayout from "../../components/MessageLayout/MessageLayout";

const MessagePage = ({ user }) => <MessageLayout title="Chat App" user={user} />

MessagePage.propTypes = {
    user: PropTypes.object
}

export default MessagePage;