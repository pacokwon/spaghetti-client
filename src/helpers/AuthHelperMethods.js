import decode from 'jwt-decode'
import axios from 'axios';

export default class AuthHelperMethods {
    setToken = token => {
        localStorage.setItem('id_token', token);
    }

    getToken = () => {
        return localStorage.getItem('id_token');
    }

    logout = () => {
        localStorage.removeItem('id_token');
    }

    login = (username, password) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = "Bearer " + this.getToken();
        }

        return axios('/user/login', {
            method: 'POST',
            data: {
                username,
                password
            }
        })
        .then(res => {
            this.setToken(res.data.token);
            return Promise.resolve(res);
        })
    };

    loggedIn = () => {
        const token = this.getToken();

        return token && !this.isTokenExpired(token);
    };

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);

            return decoded.exp < (Date.now() / 1000)
        } catch (err) {
            return false;
        }
    }

    getConfirm() {
        let token = decode(this.getToken());
        return token;
    }

    getUserData() {
        if (!this.loggedIn()) return null;
        const decoded = decode(this.getToken());
        const { username } = decoded;

        return axios('/user/data', {
            method: 'GET',
            params: {
                username
            }
        })
        .then(res => {
            return res.data;
        })
        // decoded.username
    }
}