import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AccountActions from '../../actions/account-actions';

class NewAccount extends React.Component {
    componentDidMount () {

    }

    render() {
        const {accounts} = this.props;

        return (
            <View>
                <Text>Create New Account</Text>
            </View>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        // accounts: state.accounts.accounts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AccountActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);
