import decode from 'jwt-decode'
import axios from 'axios';
import jwt from 'jsonwebtoken';

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
        return axios('/api/user/login', {
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

        return token && this.isTokenValid(token);
    };

    isTokenValid = token => {
        try {
            const decoded = jwt.verify(token, 'keyboard cat');
            console.log(decoded.exp < Date.now() / 1000);

            return decoded.exp > Date.now() / 1000;

        } catch (err) {
            return false;
        }
    }

    getUserData() {
        if (!this.loggedIn()) return null;
        const token = this.getToken();
        const { username } = decode(token);

        const headers = {
            'Accept': "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        };

        return axios('/api/user/data', {
            method: 'GET',
            headers,
            params: {
                username
            }
        })
        .then(res => {
            return res.data;
        })
    }
}
