import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';
import { ThemeContext, getTheme, ActionButton  } from 'react-native-material-ui';
import AppToolbar from './ui/AppToolbar';
import AppBottomNavigation from './ui/AppBottomNavigation';
import Accounts from './accounts/Accounts';
import Categories from './categories/Categories';
import Calendar from './transactions/Calendar';
import * as UiActions from '../actions/ui-actions';

class App extends React.Component {

    render() {
        const { actions, active, fabs } = this.props;

        return (
            <ThemeContext.Provider value={getTheme(this.props.theme)}>
                <View style={styles.container}>
                    <AppToolbar />

                    <View style={styles.container}>
                        {active === "accounts" && <Accounts />}
                        {active === "categories" && <Categories />}
                        {active === "calendar" && <Calendar />}

                        <ActionButton
                            actions={fabs}
                            //icon="share"
                            transition="speedDial"
                            onPress={fab => {
                                if (fab !== "main-button") {
                                    actions.ui.fabClicked(fab);
                                }
                            }}
                        />
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
