import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from '../reducers'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import AppToolbar from './ui/AppToolbar';
import AppBottomNavigation from './ui/AppBottomNavigation';
import { ThemeContext, getTheme } from 'react-native-material-ui';

const client = axios.create({
    baseURL: 'https://api.github.com',
    responseType: 'json'
});

const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
        <View style={styles.container}>
            <ThemeContext.Provider value={getTheme(uiTheme)}>
                <AppToolbar />

                <View style={styles.container}>
                    <Text>Open up App.js to start working on your app!</Text>
                    <Text>Changes you make will automatically reload.</Text>
                    <Text>Shake your phone to open the developer menu.</Text>
                </View>

                <AppBottomNavigation />
            </ThemeContext.Provider>
        </View>
    </Provider>
    );
  }
};

// TODO: move this to the ui-reducer
const uiTheme = {
    palette: {
        primaryColor: '#607d8b',
        // accentColor: ''
    },
    toolbar: {
        container: {
            paddingTop: 25,
            height: 75
        },
    },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
