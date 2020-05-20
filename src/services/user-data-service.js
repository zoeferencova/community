import config from "../config";

const UserDataService = {
    locationToPoint(location) {
        return `POINT(${location.lng} ${location.lat})`
    },
    milesToMeters(mileRadius) {
        return parseFloat(mileRadius*1609.34).toFixed(2);
    },
    getUser() {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
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
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => 
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    patchUser(updateValues, userId) {
        return fetch(`${config.API_ENDPOINT}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(updateValues)
          })
    }
}

export default UserDataService;