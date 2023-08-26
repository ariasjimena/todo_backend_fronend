import axios from 'axios';
//const jwt = require('jsonwebtoken');

const instance = axios.create({
    baseURL: 'http://localhost:5001/',
    timeout: 1000,
    
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
});

instance.interceptors.response.use( (response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        alert ('estas mal manin')
    }
    return Promise.reject(error);
});

export default instance;