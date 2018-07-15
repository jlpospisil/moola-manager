import expo from 'expo';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from './reducers'
import App from './components/App';

const client = axios.create({
    baseURL: 'https://api.github.com',
    responseType: 'json'
});

const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client)));

class AppRoot extends React.Component {
    render() {
        return (
            <Provider store={store}>
              <App />
            </Provider>
        );
    }
}

expo.KeepAwake.activate();
expo.registerRootComponent(AppRoot);
