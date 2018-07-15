import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';
import BottomNav from './ui/BottomNav';
import * as UiActions from '../actions/ui-actions';

class App extends React.Component {

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <BottomNav />
                    </View>
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
        theme: state.ui.theme,
        items: state.ui.navigation,
        active: state.ui.active,
        fabs: state.ui.fabs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            ui: bindActionCreators(UiActions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
