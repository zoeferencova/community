import config from "../config";

const ChatService = {
    getUserChats() {
        return fetch(`${config.API_ENDPOINT}/chats`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => 
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    postChat(chat) {
        return fetch(`${config.API_ENDPOINT}/chats`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(chat)
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    deleteChat(chatId) {
        return fetch(`${config.API_ENDPOINT}/chats/${chatId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            }     
        })
    },
    postMessage(message) {
        return fetch(`${config.API_ENDPOINT}/messages`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(message)
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
}

export default ChatService;