import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Toolbar } from 'react-native-material-ui';
import * as UiActions from '../../actions/ui-actions';

class AppToolbar extends React.Component {

    render() {
        const { active, items } = this.props;
        const active_item = items.find(item => item.key === active);
        const header = active_item && active_item.label ? active_item.label : null;

        return (
            <Toolbar
                // leftElement="menu"
                centerElement={header}
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                }}
                // rightElement={{
                //     menu: {
                //         icon: "more-vert",
                //         labels: ["item 1", "item 2"],
                //     }
                // }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        active: state.ui.active,
        items: state.ui.navigation.bottom
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            ui: bindActionCreators(UiActions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar);