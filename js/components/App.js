import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { ThemeContext, getTheme } from 'react-native-material-ui';
import AppToolbar from './ui/AppToolbar';
import AppBottomNavigation from './ui/AppBottomNavigation';
import Accounts from './accounts/Accounts';
import Categories from './categories/Categories';
import Calendar from './transactions/Calendar';

class App extends React.Component {

    render() {
        const { active } = this.props;

        return (
            <ThemeContext.Provider value={getTheme(this.props.theme)}>
                <View style={styles.container}>
                    <AppToolbar />

                    <View style={styles.container}>
                        {active === "accounts" && <Accounts />}
                        {active === "categories" && <Categories />}
                        {active === "calendar" && <Calendar />}
                    </View>

                    <AppBottomNavigation />
                </View>
            </ThemeContext.Provider>

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
        active: state.ui.active
    };
};

export default connect(mapStateToProps)(App);
