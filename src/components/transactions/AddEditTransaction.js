import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, View, Alert } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import * as TransactionActions from '../../redux/actions/transaction-actions';
import styles from '../../lib/styles';

class AddEditTransaction extends React.Component {
  componentDidMount() {

  }

  _updateCurrentTransaction(item) {
    console.log({ item });
  }

  _saveOrUpdateTransaction() {
    Alert.alert('save', 'save or update transaction here');
  }

  render() {
    const { current_transaction } = this.props;

    // Note: Android and iOS both interact with this prop differently. Android may behave better when given no behavior prop at all, whereas iOS is the opposite.
    // Options: height|position|padding     Usage: behavior='padding'
    // Resource: https://facebook.github.io/react-native/docs/keyboardavoidingview#behavior
    return (
      <KeyboardAvoidingView style={[styles.container, styles.padding20]}>
        <View style={[styles.container, { alignItems: 'flex-start' }]}>
          <FormLabel>
            Vendor
          </FormLabel>
          <FormInput
            autoFocus
            returnKeyType='next'
            style={styles.input}
            value={current_transaction.vendor}
            onChangeText={val => this._updateCurrentTransaction({ vendor: val })}
            onSubmitEditing={() => this.descriptionInput.focus()}
          />

          <FormLabel>
            Description
          </FormLabel>
          <FormInput
            returnKeyType='next'
            style={styles.input}
            value={current_transaction.description}
            ref={(input) => { this.descriptionInput = input; }}
            onChangeText={val => this._updateCurrentTransaction({ description: val })}
            onSubmitEditing={() => this.amountInput.focus()}
          />

          <FormLabel>
            Amount
          </FormLabel>
          <FormInput
            keyboardType='numeric'
            returnKeyType='go'
            style={styles.input}
            value={`${current_transaction.amount || ''}`}
            ref={(input) => { this.amountInput = input; }}
            onChangeText={val => this._updateCurrentTransaction({ balance: val })}
            onSubmitEditing={() => this._saveOrUpdateTransaction()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

AddEditTransaction.propTypes = {
  current_transaction: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    current_transaction: state.transactions.current_transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(TransactionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTransaction);
