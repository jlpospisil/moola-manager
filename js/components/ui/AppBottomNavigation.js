import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { View } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import * as UiActions from '../../actions/ui-actions';
import AppBottomNavigationItem from './AppBottomNavigationItem';

class AppBottomNavigation extends React.Component {
    // TODO: get Link element working

    render() {
        return (
            <View style={{width: "100%"}}>
                <BottomNavigation active={this.props.active} hidden={false}>
                    {
                        this.props.items.map(item => (
                            //<Link to={item.path} key={item.key}>
                                <AppBottomNavigationItem
                                    key={item.key}
                                    icon={this.props.icons[item.key]}
                                    label={item.label}
                                    link={item.path}
                                    onPress={() => this.props.actions.ui.changeActiveItem(item.key)}
                                />
                            //</Link>
                        ))
                    }
                </BottomNavigation>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        active: state.ui.active,
        items: state.ui.navigation.bottom,
        icons: state.ui.icons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            ui: bindActionCreators(UiActions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBottomNavigation);