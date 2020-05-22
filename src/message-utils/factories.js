const uuidv4 = require("uuid/v4");

const createMessage = ({ message="", sender="" } = {}) => {(
    {
        id: uuidv4(),
        timestamp: getTime(new Date(Date.now())),
        message,
        sender
    }
)}

const createChat = ({ messages=[], name="community", users=[] } = {}) => {(
   {
       id: uuidv4(),
       name,
       messages,
       users,
       typingUsers: []
   } 
)}

const getTime = date => {
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
}

module.exports = {
    createMessage,
    createChat
}
    
 