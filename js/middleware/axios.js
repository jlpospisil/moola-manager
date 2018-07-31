import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import * as localStorage from '../lib/app-local-storage';

let authToken = null;
let remoteServer = {
    baseURL: null,
    responseType: 'json'
};
const client = axios.create(remoteServer);
const LOGIN_URL = '/login';

const handleLogin = async () => {
    const remoteServer = await localStorage.getItem('remote-server');
    const username = await localStorage.getItem('remote-username');
    const password = await localStorage.getItem('remote-password');

    if (remoteServer && username && password) {
        await client.post(LOGIN_URL, { username, password })
            .then(async response => {
                const token = response.data.token;

                if (token) {
                    await localStorage.setItem('auth-token', token);
                }
            })
            .catch(error => {
                console.log({ error });
            });
    }
};

const options = {
    returnRejectedPromiseOnError: true,
    interceptors: {
        request: [
            async ({}, config) => {
                if (!remoteServer.baseURL) {
                    remoteServer.baseURL = await localStorage.getItem('remote-server');
                }

                if (!authToken && config.url !== LOGIN_URL) {
                    authToken = await localStorage.getItem('auth-token');

                    if (!authToken) {
                        await handleLogin();
                        authToken = await localStorage.getItem('auth-token');
                    }
                }

                config.baseURL = remoteServer.baseURL;
                config.headers.common.Authorization = `Bearer ${authToken}`;

                if (!config.baseURL) {
                    axios.Cancel('No remote server set');
                }

                return config;
            }
        ],
        response: [
            {
                error: async ({getState, dispatch, getSourceAction}, error) => {
                    console.log({ error });

                    // If 403, refresh/renew token and retry,
                    if (error.toString().includes('Request failed with status code 403')) {
                        // Remove old token
                        await localStorage.removeItem('auth-token');

                        // Attempt to retrieve a new token
                        await handleLogin();

                        // If a new token was successfully retrieved, retry the request
                        authToken = await localStorage.getItem('auth-token');

                        if (authToken) {
                            console.log('TODO: retry request here');
                        }
                    }

                    return error;
                }
            }
        ]
    }
};

export default axiosMiddleware(client, options);