import React from 'react';
import { connect } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import { StyleSheet, View, Text } from 'react-native';
import { ThemeContext, getTheme } from 'react-native-material-ui';
import AppToolbar from './ui/AppToolbar';
import AppBottomNavigation from './ui/AppBottomNavigation';
import Accounts from './accounts/Accounts';
import { Link } from 'react-router-native';

class App extends React.Component {
    // TODO: why don't "Click Here 2" or bottom nav links work?

    render() {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <ThemeContext.Provider value={getTheme(this.props.theme)}>
                        <AppToolbar />

                        <View style={styles.container}>
                            <Link to="/accounts" style={{paddingBottom: 15}}><Text>Click Here 1</Text></Link>

                            <Route exact={false} path="/accounts" component={Accounts} />
                        </View>

                        <Link to="/accounts" style={{paddingBottom: 15}}><Text>Click Here 2</Text></Link>

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
