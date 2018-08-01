import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navigation from './ui/Navigation';

const App = () => (
    <Provider store={store}>
        <Navigation />
    </Provider>
);

export default App;