const uuidv4 = require("uuid/v4");
import { DateTime } from 'luxon';


export const createMessage = ({ message = "", sender = "" } = {}) => {
    (
        {
            id: uuidv4(),
            timestamp: DateTime.local().toISO(),
            message,
            sender
        }
    )
}

export const createChat = ({ messages = [], name = "community", users = [] } = {}) => {
    (
        {
            id: uuidv4(),
            name,
            messages,
            users,
            typingUsers: []
        }
    )
}

const getTime = date => {
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
}

