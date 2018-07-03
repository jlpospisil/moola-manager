import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ThemeContext, getTheme } from 'react-native-material-ui';
import AppToolbar from './ui/AppToolbar';
import AppBottomNavigation from './ui/AppBottomNavigation';

class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <ThemeContext.Provider value={getTheme(this.props.theme)}>
                <AppToolbar />

                <View style={styles.container}>
                    <Text>Open up App.js to start working on your app!</Text>
                    <Text>Changes you make will automatically reload.</Text>
                    <Text>Shake your phone to open the developer menu.</Text>
                </View>

                <AppBottomNavigation />
            </ThemeContext.Provider>
        </View>
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
