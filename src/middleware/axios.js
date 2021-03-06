import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import Config from '../config';
import Alerts from '../lib/alerts';
import * as localStorage from '../lib/app-local-storage';

const { API_ADDRESS } = Config;
const LOGIN_URL = '/login';
const remoteServer = {
  baseURL: API_ADDRESS,
  responseType: 'json'
};
const client = axios.create(remoteServer);
let authToken = null;

/**
 * Intercept request to inject the remoteServer from local storage
 */
client.interceptors.request.use(async (requestConfig) => {
  const config = requestConfig;

  if (!authToken && config.url !== LOGIN_URL) {
    authToken = await localStorage.getItem('auth-token');

    if (!authToken) {
      await handleLogin();
      authToken = await localStorage.getItem('auth-token');
    }
  }

  config.headers.common.Authorization = `Bearer ${authToken}`;

  if (!config.baseURL) {
    axios.Cancel('No remote server set');
  }

  return config;
});

/**
 * Intercept the response to check for authentication error
 * If there is an authentication error, attempt to refresh the token and retry the request
 */
client.interceptors.response.use(async (response) => {
  let { url } = response.config;
  url = url.replace(remoteServer.baseURL, '');

  if (url === LOGIN_URL) {
    const { token } = response.data;

    if (token) {
      await localStorage.setItem('auth-token', token);
    }
  }

  return response;
}, async (error) => {
  let { url } = error.config;
  url = url.replace(remoteServer.baseURL, '');

  // If 403, refresh/renew token and retry
  if (error.response.status === 403) {
    // Invalid login attempt
    if (url === LOGIN_URL) {
      Alerts.error('Unable to authenticate')
    }
    else {
      // Attempt to retrieve a new token
      await handleLogin();

      // If a new token was successfully retrieved, retry the request
      authToken = await localStorage.getItem('auth-token');

      if (authToken) {
        return client.request(error.config);
      }
    }
  }

  return error;
});

/**
 * Login attempt
 * @returns {Promise.<void>}
 */
export const handleLogin = async () => {
  // Remove old token
  await localStorage.removeItem('auth-token');

  const username = await localStorage.getItem('remote-username');
  const password = await localStorage.getItem('remote-password');

  if (username && password) {
    await client.post(LOGIN_URL, { username, password });
  }
};

export default axiosMiddleware(client, {
  returnRejectedPromiseOnError: true
});
