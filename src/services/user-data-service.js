import config from "../config";

const UserDataService = {
    locationToPoint(location) {
        return `POINT(${location.lng} ${location.lat})`
    },
    milesToMeters(mileRadius) {
        return parseFloat(mileRadius * 1609.34).toFixed(2);
    },
    metersToMiles(meterValue) {
        return parseFloat(meterValue / 1609.34).toFixed(1);
    },
    async getUser() {
        const res = await fetch(`${config.API_ENDPOINT}/users`, {
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
    async getPosts() {
        const res = await fetch(`${config.API_ENDPOINT}/posts/neighborhood-posts`, {
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
    async postPost(post) {
        const res = await fetch(`${config.API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(post)
        });
        return await (
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json());
    },
    patchPost(updateValues, postId) {
        return fetch(`${config.API_ENDPOINT}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(updateValues)
        })
    },
    deletePost(postId) {
        return fetch(`${config.API_ENDPOINT}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            }
        })
    },
    async patchUser(updateValues, userId) {
        const res = await fetch(`${config.API_ENDPOINT}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(updateValues)
        });
        return !res.ok && res.json().then(e => Promise.reject(e));
    },
    deleteUser(userId) {
        return fetch(`${config.API_ENDPOINT}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            }
        })
    }
}

export default UserDataService;