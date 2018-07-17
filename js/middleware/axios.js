import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
    baseURL:'http://host.domain.com/api',
    responseType: 'json'
});

const options = {
    returnRejectedPromiseOnError: true,
    interceptors: {
        request: [
            ({}, config) => {
                // TODO: check to see if token exists and is unexpired.  If so, add it.  If not, get a new one.
                const authToken = "";
                config.headers.common.Authorization = `Bearer ${authToken}`;

                return config;
            }
        ],
        response: [
            {
                error: ({}, error) => {
                    // TODO: check for 403 error.  If 403, refresh/renew token and retry.
                    console.log({ error });

                    return Promise.reject(error);
                }
            }
        ]
    }
};

export default axiosMiddleware(client, options);