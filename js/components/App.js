import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import Header from './ui/Header';
import Navigation from './ui/Navigation';

class App extends React.Component {

    render() {
        const { theme } = this.props;

        return (
            <View style={styles.container}>
                <Header />
                <Navigation />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = (state) => {
    return {
        theme: state.ui.theme
    };
};

export default connect(mapStateToProps)(App);
