import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView, View, Alert, Picker
} from 'react-native';
import FloatingLabelInput from '../generic/FloatingLabelInput';
import FloatingLabelPicker from '../generic/FloatingLabelPicker';
import * as AccountActions from '../../redux/actions/account-actions';
import * as TransactionActions from '../../redux/actions/transaction-actions';
import styles from '../../lib/styles';

class AddEditTransaction extends React.Component {
  constructor(props) {
    super(props);

    this._saveOrUpdateTransaction = this._saveOrUpdateTransaction.bind(this);
    this._updateCurrentTransaction = this._updateCurrentTransaction.bind(this);
  }

  componentWillMount() {
    const { navigation, current_account, actions } = this.props;
    const { loadAccounts } = actions.accounts;
    navigation.setParams({
      saveTransaction: this._saveOrUpdateTransaction.bind(this),
    });
    loadAccounts();
    this._updateCurrentTransaction({ account_id: current_account.id });
  }

  _updateCurrentTransaction(item) {
    const { current_account, current_transaction, actions } = this.props;
    actions.updateCurrentTransaction({
      ...current_transaction,
      ...item
    });
  }

  _saveOrUpdateTransaction() {
    const { current_transaction } = this.props;
    if (current_transaction.id === null) {
      this._saveNewTransaction();
    }
    else {
      this._updateExistingTransaction();
    }
  }

  _saveNewTransaction() {
    const { current_transaction, actions, navigation } = this.props;
    const { createNewTransaction, clearCurrentTransaction } = actions;
    createNewTransaction(current_transaction).then(clearCurrentTransaction);
    // TODO: navigate to account with id=current_transaction.account_id instead
    navigation.goBack();
  }

  _updateExistingTransaction() {
    const { current_transaction } = this.props;
    Alert.alert('save', 'update existing transaction');
  }

  render() {
    const { current_transaction, accounts } = this.props;

    // Note: Android and iOS both interact with this prop differently. Android may behave better when given no behavior prop at all, whereas iOS is the opposite.
    // Options: height|position|padding     Usage: behavior='padding'
    // Resource: https://facebook.github.io/react-native/docs/keyboardavoidingview#behavior
    return (
      <KeyboardAvoidingView style={[styles.container, styles.padding20]}>
        <View style={[styles.container, { alignItems: 'flex-start' }]}>
          <FloatingLabelPicker
            label='Account'
            items={accounts.map((account) => {
              return {
                value: account.id,
                label: account.name
              };
            })}
            selectedValue={current_transaction.account_id}
            onValueChange={val => this._updateCurrentTransaction({ account_id: val })}
          />

          <FloatingLabelInput
            label='Merchant'
            autoFocus
            returnKeyType='next'
            value={current_transaction.merchant}
            style={{ marginBottom: 5 }}
            onChangeText={val => this._updateCurrentTransaction({ merchant: val })}
            onSubmitEditing={() => this.descriptionInput.focus()}
          />

          <FloatingLabelInput
            label='Description'
            returnKeyType='next'
            inputRef={(input) => { this.descriptionInput = input; }}
            value={current_transaction.description}
            style={{ marginBottom: 5 }}
            onChangeText={val => this._updateCurrentTransaction({ description: val })}
            onSubmitEditing={() => this.amountInput.focus()}
          />

          <FloatingLabelInput
            label='Amount'
            keyboardType='numeric'
            returnKeyType='go'
            value={`${current_transaction.amount || ''}`}
            inputRef={(input) => { this.amountInput = input; }}
            onChangeText={val => this._updateCurrentTransaction({ amount: val })}
            onSubmitEditing={() => this._saveOrUpdateTransaction()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

AddEditTransaction.propTypes = {
  navigation: PropTypes.object.isRequired,
  current_account: PropTypes.object,
  current_transaction: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts.accounts,
    current_account: state.accounts.current_account,
    current_transaction: state.transactions.current_transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      ...bindActionCreators(TransactionActions, dispatch),
      accounts: {
        ...bindActionCreators(AccountActions, dispatch)
      }
    }
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AddEditTransaction)
);
