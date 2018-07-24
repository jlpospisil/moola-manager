import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import axiosMiddleware from '../middleware/axios';
import rootReducer from '../reducers'
import Header from './ui/Header';
import Navigation from './ui/Navigation';
import ActionButtons from './ui/ActionButtons';

const store = createStore(
    rootReducer,
    applyMiddleware(
        axiosMiddleware
    )
);

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Header />
                    <Navigation />
                    <ActionButtons />
                </View>
            </Provider>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
