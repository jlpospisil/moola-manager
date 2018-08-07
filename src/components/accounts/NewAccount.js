import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import * as AccountActions from '../../redux/actions/account-actions';
import styles from '../../lib/styles';

class NewAccount extends React.Component {
  componentDidMount() {

  }

  render() {
    // Note: Android and iOS both interact with this prop differently. Android may behave better when given no behavior prop at all, whereas iOS is the opposite.
    // Options: height|position|padding     Usage: behavior='padding'
    // Resource: https://facebook.github.io/react-native/docs/keyboardavoidingview#behavior
    return (
      <KeyboardAvoidingView style={[styles.container, styles.padding20]}>
        <View style={[styles.container, { alignItems: 'flex-start' }]}>
          <FormLabel>
            Account Name
          </FormLabel>
          <FormInput
            autoFocus
            returnKeyType='next'
            style={styles.input}
          />

          <FormLabel>
            Description
          </FormLabel>
          <FormInput
            returnKeyType='next'
            style={styles.input}
          />

          <FormLabel>
            Starting Balance
          </FormLabel>
          <FormInput
            keyboardType='numeric'
            returnKeyType='go'
            style={styles.input}
          />
        </View>
      </KeyboardAvoidingView>
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
