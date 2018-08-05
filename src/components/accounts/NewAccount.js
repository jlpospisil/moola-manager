import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import * as AccountActions from '../../redux/actions/account-actions';
import styles from '../../lib/styles';

class NewAccount extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
                Create New Account
        </Text>
      </View>
    );
  }
}

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
