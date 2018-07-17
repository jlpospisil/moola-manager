import expo from 'expo';
import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import axiosMiddleware from './middleware/axios';
import rootReducer from './reducers'
import App from './components/App';

const store = createStore(
    rootReducer,
    applyMiddleware(
        axiosMiddleware
    )
);

class AppRoot extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

expo.KeepAwake.activate();
expo.registerRootComponent(AppRoot);
