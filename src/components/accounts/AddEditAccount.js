import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { View, KeyboardAvoidingView } from 'react-native';
import FloatingLabelInput from '../generic/FloatingLabelInput';
import * as AccountActions from '../../redux/actions/account-actions';
import { Alerts, Styles } from '../../lib';

class AddEditAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      save_attempted: false
    };

    this._saveOrUpdateAccount = this._saveOrUpdateAccount.bind(this);
    this._updateCurrentAccount = this._updateCurrentAccount.bind(this);
  }

  componentWillMount() {
    const { navigation } = this.props;
    navigation.setParams({
      saveAccount: this._saveOrUpdateAccount.bind(this)
    });
    this.setState({ save_attempted: false });
  }

  _updateCurrentAccount(item) {
    const { current_account, actions } = this.props;
    actions.updateCurrentAccount({
      ...current_account,
      ...item
    });
  }

  _saveOrUpdateAccount() {
    const { current_account } = this.props;
    const { id, name, balance } = current_account;

    this.setState({ save_attempted: true });

    if (!name || !balance) {
      Alerts.error('Missing required fields');
    }
    else if (id === null) {
      this._saveNewAccount();
    }
    else {
      this._updateExistingAccount();
    }
  }

  _saveNewAccount() {
    const { current_account, actions, navigation } = this.props;
    actions.createNewAccount(current_account).then(actions.clearCurrentAccount);
    navigation.navigate('Accounts');
  }

  _updateExistingAccount() {
    const { current_account, actions, navigation } = this.props;
    actions.updateAccount(current_account).then(actions.clearCurrentAccount);
    navigation.navigate('Accounts');
  }

  render() {
    const { save_attempted } = this.state;
    const { current_account } = this.props;

    // Note: Android and iOS both interact with this prop differently. Android may behave better when given no behavior prop at all, whereas iOS is the opposite.
    // Options: height|position|padding     Usage: behavior='padding'
    // Resource: https://facebook.github.io/react-native/docs/keyboardavoidingview#behavior
    return (
      <KeyboardAvoidingView style={[Styles.container, Styles.padding20]}>
        <View style={[Styles.container, { alignItems: 'flex-start' }]}>
          <FloatingLabelInput
            label='Account Name'
            autoFocus
            error={save_attempted && !current_account.name}
            returnKeyType='next'
            value={current_account.name}
            onChangeText={val => this._updateCurrentAccount({ name: val })}
            onSubmitEditing={() => this.descriptionInput.focus()}
            style={{ marginBottom: 20 }}
          />

          <FloatingLabelInput
            label='Description'
            returnKeyType='next'
            value={current_account.description}
            inputRef={(input) => { this.descriptionInput = input; }}
            onChangeText={val => this._updateCurrentAccount({ description: val })}
            onSubmitEditing={() => this.balanceInput.focus()}
            style={{ marginBottom: 20 }}
          />

          <FloatingLabelInput
            label='Starting Balance'
            keyboardType='numeric'
            returnKeyType='go'
            error={save_attempted && !current_account.balance}
            value={`${current_account.balance || ''}`}
            inputRef={(input) => { this.balanceInput = input; }}
            onChangeText={val => this._updateCurrentAccount({ balance: val })}
            onSubmitEditing={() => this._saveOrUpdateAccount()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

AddEditAccount.propTypes = {
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
  connect(mapStateToProps, mapDispatchToProps)(AddEditAccount)
);
