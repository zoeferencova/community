import config from "../config";
import TokenService from "./token-service";

const AuthApiService = {
    async postUser(user) {
        const res = await fetch(`${config.API_ENDPOINT}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await (
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json());
    },
    async postLogin({ email, password }) {
        const res = await fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const res_1 = await (
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json());
        TokenService.saveAuthToken(res_1.authToken);
        return res_1.user;
    },
    async updateAuthToken({ email, userId }) {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/auth/update-jwt`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email, userId }),
            });
            const res_1 = await (
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json());
            TokenService.saveAuthToken(res_1.authToken);
        } catch (err) {
            return console.log(err);
        }
    },
    async checkPassword(password) {
        const res = await fetch(`${config.API_ENDPOINT}/auth/confirm-password`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(password),
        });
        return (!res.ok)
            ? res.json()
            : res.body;
    }
}

export default AuthApiService;