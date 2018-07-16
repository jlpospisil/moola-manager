import expo from 'expo';
import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
// import {AsyncStorage} from 'react-native';
// import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import App from './components/App';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
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
