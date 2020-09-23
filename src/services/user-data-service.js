import config from "../config";

const UserDataService = {
    locationToPoint(location) {
        return `POINT(${location.lng} ${location.lat})`
    },
    milesToMeters(mileRadius) {
        return parseFloat(mileRadius*1609.34).toFixed(2);
    },
    metersToMiles(meterValue) {
        return parseFloat(meterValue/1609.34).toFixed(1);
    },
    getUser() {
        return fetch(`${config.API_ENDPOINT}/users`, {
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
    getPosts() {
        return fetch(`${config.API_ENDPOINT}/posts/neighborhood-posts`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => 
                (!res.ok)
                ? console.log('hi')
                : res.json()
            )
    },
    postPost(post) {
        return fetch(`${config.API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(post)
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
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
    patchUser(updateValues, userId) {
        return fetch(`${config.API_ENDPOINT}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(updateValues)
          })
          .then(res => !res.ok && res.json().then(e => Promise.reject(e)) 
        )
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