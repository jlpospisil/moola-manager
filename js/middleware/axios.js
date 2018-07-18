import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import * as localStorage from '../lib/app-local-storage';

const client = axios.create({
    baseURL:'http://192.168.200.24:8080/api',
    responseType: 'json'
});

let authToken = null;

const options = {
    returnRejectedPromiseOnError: true,
    interceptors: {
        request: [
            async ({}, config) => {
                if (!authToken) {
                    authToken = await localStorage.getItem("auth-token");
                }

                config.headers.common.Authorization = `Bearer ${authToken}`;

                return config;
            }
        ],
        response: [
            {
                error: async ({getState, dispatch, getSourceAction}, error) => {
                    // TODO: check for 403 error.
                    console.log({ error });

                    // If 403, refresh/renew token and retry,
                    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqcG9zcGlzaWwiLCJleHAiOjE1MzI2NTE4MDl9.suX5tvBe3JRNEa9KIAp4yFvBb9dTPV_GFOYnMgvKnR8KcStYfCkB-GGX2hMvbRxTyfZkxIrVW6SglfDbruFEGw";

                    await localStorage.setItem("auth-token", token);

                    return error;
                }
            }
        ]
    }
};

export default axiosMiddleware(client, options);