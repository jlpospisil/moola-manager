import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import * as localStorage from '../lib/app-local-storage';

let authToken = null;

let remoteServer = {
    baseURL: null, // TODO: get this from local storage.  await wasn't working.
    responseType: 'json'
};

const client = axios.create(remoteServer);

const options = {
    returnRejectedPromiseOnError: true,
    interceptors: {
        request: [
            async ({}, config) => {
                if (!remoteServer.baseURL) {
                    remoteServer.baseURL = await localStorage.getItem("remote-server");
                }

                if (!authToken) {
                    authToken = await localStorage.getItem("auth-token");
                }

                config.baseURL = remoteServer.baseURL;
                config.headers.common.Authorization = `Bearer ${authToken}`;

                if (!config.baseURL) {
                    axios.Cancel("No remote server set");
                }

                return config;
            }
        ],
        response: [
            {
                error: async ({getState, dispatch, getSourceAction}, error) => {
                    // If 403, refresh/renew token and retry,
                    if (error.toString().includes("Request failed with status code 403")) {
                        const username = await localStorage.getItem("remote-username");
                        const password = await localStorage.getItem("remote-password");

                        // TODO: prevent infinite loop on invalid credentials
                        if (username && password) {
                            client.post("/login", { username, password })
                                .then(async response => {
                                    const token = response.data.token;

                                    if (token) {
                                        await localStorage.setItem("auth-token", token);

                                        // TODO: retry request here
                                    }
                                })
                                .catch(error => {
                                    console.log({ error });
                                });

                        }
                    }

                    return error;
                }
            }
        ]
    }
};

export default axiosMiddleware(client, options);