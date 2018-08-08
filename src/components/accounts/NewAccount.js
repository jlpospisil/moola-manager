import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { View, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import * as AccountActions from '../../redux/actions/account-actions';
import styles from '../../lib/styles';

class NewAccount extends React.Component {
  constructor(props) {
    super(props);

    this._updateCurrentAccount = this._updateCurrentAccount.bind(this);
  }

  componentWillMount() {
    const { navigation } = this.props;
    navigation.setParams({
      saveNewAccount: this._saveAccount.bind(this),
    });
  }

  _updateCurrentAccount(item) {
    const { current_account, actions } = this.props;
    actions.updateCurrentAccount({
      ...current_account,
      ...item
    });
  }

  _saveAccount() {
    const { current_account, actions, navigation } = this.props;
    actions.createNewAccount(current_account);
    navigation.navigate('Accounts');
  }

  render() {
    const { current_account } = this.props;

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
            value={current_account.name}
            onChangeText={val => this._updateCurrentAccount({ name: val })}
            onSubmitEditing={() => this.descriptionInput.focus()}
          />

          <FormLabel>
            Description
          </FormLabel>
          <FormInput
            returnKeyType='next'
            style={styles.input}
            value={current_account.description}
            ref={(input) => { this.descriptionInput = input; }}
            onChangeText={val => this._updateCurrentAccount({ description: val })}
            onSubmitEditing={() => this.balanceInput.focus()}
          />

          <FormLabel>
            Starting Balance
          </FormLabel>
          <FormInput
            keyboardType='numeric'
            returnKeyType='go'
            style={styles.input}
            value={current_account.balance}
            ref={(input) => { this.balanceInput = input; }}
            onChangeText={val => this._updateCurrentAccount({ balance: val })}
            onSubmitEditing={() => this._saveAccount()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

NewAccount.propTypes = {
  navigation: PropTypes.object.isRequired,
  current_account: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    current_account: state.accounts.current_account
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AccountActions, dispatch)
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(NewAccount)
);
