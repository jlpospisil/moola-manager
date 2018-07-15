import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import BottomNavIcon from './ui/BottomNavIcon';
import Accounts from './accounts/Accounts';
import Categories from './categories/Categories';
import Calendar from './transactions/Calendar';
import * as UiActions from '../actions/ui-actions';

class App extends React.Component {

    render() {
        const { theme } = this.props;

        const routes = {
            Accounts: {
                screen: Accounts,
                navigationOptions: {
                    title: 'Accounts',
                    tabBarIcon: BottomNavIcon("credit-card")
                }
            },
            Calendar: {
                screen: Calendar,
                navigationOptions: {
                    title: 'Calendar',
                    tabBarIcon: BottomNavIcon("event")
                }
            },
            Categories: {
                screen: Categories,
                navigationOptions: {
                    title: 'Categories',
                    tabBarIcon: BottomNavIcon("folder")
                }
            }
        };

        const navigatorConfig = {
            initialRouteName: 'Accounts',
            // labeled: false,
            // shifting: true,
            activeTintColor: theme.primaryColor,
            // inactiveTintColor: 'red',
            barStyle: {
                backgroundColor: '#ffffff'
            }
        };

        const Router = createMaterialBottomTabNavigator(routes, navigatorConfig);

        return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        {/*active === "accounts" && <Accounts />}
                        {active === "categories" && <Categories />}
                        {active === "calendar" && <Calendar />*/}
                        <Router />
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
