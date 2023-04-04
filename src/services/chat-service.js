import config from "../config";

const ChatService = {
    async getUserChats() {
        const res = await fetch(`${config.API_ENDPOINT}/chats`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            }
        });
        return await (
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json());
    },
    async postChat(chat) {
        const res = await fetch(`${config.API_ENDPOINT}/chats`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(chat)
        });
        return await (
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json());
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
    async postMessage(message) {
        const res = await fetch(`${config.API_ENDPOINT}/messages`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(message)
        });
        return await (
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json());
    },
}

export default ChatService;