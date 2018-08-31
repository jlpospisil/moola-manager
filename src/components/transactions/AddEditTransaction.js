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
import { Alerts, Styles } from '../../lib';

class AddEditTransaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      save_attempted: false
    };

    this._saveOrUpdateTransaction = this._saveOrUpdateTransaction.bind(this);
    this._updateCurrentTransaction = this._updateCurrentTransaction.bind(this);
    this._transactionSaved = this._transactionSaved.bind(this);
  }

  componentWillMount() {
    const { navigation, current_account, actions } = this.props;
    const { loadAccounts } = actions.accounts;
    navigation.setParams({
      saveTransaction: this._saveOrUpdateTransaction.bind(this),
    });
    loadAccounts();
    this._updateCurrentTransaction({ account_id: current_account.id });
    this.setState({ save_attempted: false });
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
    const { id, account_id, amount } = current_transaction;

    this.setState({ save_attempted: true });

    if (!account_id || !amount) {
      Alerts.error('Missing required fields');
    }
    else if (id === null) {
      this._saveNewTransaction();
    }
    else {
      this._updateExistingTransaction();
    }
  }

  _saveNewTransaction() {
    const { _transactionSaved } = this;
    const { current_transaction, actions } = this.props;
    const { createNewTransaction, } = actions;
    createNewTransaction(current_transaction).then(_transactionSaved);
  }

  _updateExistingTransaction() {
    const { current_transaction } = this.props;
    Alert.alert('save', 'update existing transaction');
  }

  _transactionSaved() {
    const {
      current_transaction, actions, navigation, accounts
    } = this.props;
    const { clearCurrentTransaction } = actions;
    const { updateCurrentAccount } = actions.accounts;
    const account = accounts.find(account => account.id == current_transaction.account_id);

    if (account) {
      const { name } = account;
      clearCurrentTransaction();
      updateCurrentAccount(account);
      navigation.navigate('AccountTransactions', { title: `${name} Transactions` });
    }
    else {
      navigation.goBack();
    }
  }

  render() {
    const { save_attempted } = this.state;
    const { current_transaction, accounts } = this.props;
    const { account_id, amount } = current_transaction;

    // Note: Android and iOS both interact with this prop differently. Android may behave better when given no behavior prop at all, whereas iOS is the opposite.
    // Options: height|position|padding     Usage: behavior='padding'
    // Resource: https://facebook.github.io/react-native/docs/keyboardavoidingview#behavior
    return (
      <KeyboardAvoidingView style={[Styles.container, Styles.padding20]}>
        <View style={[Styles.container, { alignItems: 'flex-start' }]}>
          <FloatingLabelPicker
            label='Account'
            error={save_attempted && !account_id}
            items={accounts.map((account) => {
              return {
                value: account.id,
                label: account.name
              };
            })}
            selectedValue={account_id}
            onValueChange={(val) => {
              this._updateCurrentTransaction({ account_id: val });
              this.merchantInput.focus();
            }}
            style={{ marginBottom: 20 }}
          />

          <FloatingLabelInput
            label='Merchant'
            autoFocus
            returnKeyType='next'
            inputRef={(input) => { this.merchantInput = input; }}
            value={current_transaction.merchant}
            style={{ marginBottom: 20 }}
            onChangeText={val => this._updateCurrentTransaction({ merchant: val })}
            onSubmitEditing={() => this.descriptionInput.focus()}
          />

          <FloatingLabelInput
            label='Description'
            returnKeyType='next'
            inputRef={(input) => { this.descriptionInput = input; }}
            value={current_transaction.description}
            style={{ marginBottom: 20 }}
            onChangeText={val => this._updateCurrentTransaction({ description: val })}
            onSubmitEditing={() => this.amountInput.focus()}
          />

          <FloatingLabelInput
            label='Amount'
            keyboardType='numeric'
            returnKeyType='go'
            error={save_attempted && !amount}
            value={`${amount || ''}`}
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
  actions: PropTypes.object.isRequired,
  accounts: PropTypes.array
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
