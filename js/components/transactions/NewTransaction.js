import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TransactionActions from '../../redux/actions/transaction-actions';
import { View, Text } from 'react-native';
import styles from '../../lib/styles';

class NewTransaction extends React.Component {
    componentDidMount () {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Create New Transaction</Text>
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
        actions: bindActionCreators(TransactionActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTransaction);
