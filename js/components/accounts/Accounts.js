import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Text } from 'react-native';

class Accounts extends React.Component {
  render() {
    return (
        <Text>
            Accounts
        </Text>
    );
  }
};

const mapStateToProps = (state) => {
    return {
        // active: state.ui.active,
        // items: state.ui.navigation.bottom
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // actions: {
        //     ui: bindActionCreators(UiActions, dispatch)
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);