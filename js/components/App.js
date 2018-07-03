import React from 'react';
import { connect } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import { ThemeContext, getTheme } from 'react-native-material-ui';
import AppToolbar from './ui/AppToolbar';
import AppBottomNavigation from './ui/AppBottomNavigation';
import Accounts from './accounts/Accounts';

class App extends React.Component {
  render() {
    return (
        <NativeRouter>
            <View style={styles.container}>
                <ThemeContext.Provider value={getTheme(this.props.theme)}>
                    <AppToolbar />

                    <View style={styles.container}>
                        <Route exact={true} path="/accounts" component={Accounts} />
                    </View>

                    <AppBottomNavigation />
                </ThemeContext.Provider>
            </View>
        </NativeRouter>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => {
    return {
        theme: state.ui.theme,
    };
};

export default connect(mapStateToProps)(App);
