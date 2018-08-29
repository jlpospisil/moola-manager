import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Alert, View, FlatList, RefreshControl
} from 'react-native';
import styles from '../../lib/styles';
import SwipeableListItem from '../ui/SwipeableListItem';
import ActionButtons from '../ui/ActionButtons';
import * as AccountActions from '../../redux/actions/account-actions';
import * as TransactionActions from '../../redux/actions/transaction-actions';
import { initialState as initialAccountState } from '../../redux/reducers/account-reducer';

class AccountTransactions extends React.PureComponent {
  constructor(props) {
    super(props);

    this._loadTransactions = this._loadTransactions.bind(this);
  }

  componentWillMount() {
    const { _loadTransactions } = this;
    _loadTransactions();
  }

  componentWillUnmount() {
    const { actions } = this.props;
    const { updateCurrentAccount } = actions.accounts;
    const { current_account } = initialAccountState;
    updateCurrentAccount(current_account);
  }

  _loadTransactions() {
    const { current_account, actions } = this.props;
    const { loadAccountTransactions } = actions;

    if (current_account && current_account.id) {
      loadAccountTransactions(current_account.id);
    }
  }

  render() {
    const { _loadTransactions } = this;
    const { transactions, loading } = this.props;

    const TransactionListItem = (transaction) => {
      const {
        id, description, amount
      } = transaction;

      return (
        <SwipeableListItem
          title='Vendor here'
          subtitle={description}
          rightTitle={`$${amount}`}
          onEdit={() => Alert.alert('TODO', 'Edit transaction here')}
          onDelete={() => Alert.alert('TODO', 'Delete transaction here')}
        />
      );
    };

    return (
      <View style={styles.container}>
        <FlatList
          data={transactions}
          keyExtractor={item => item.id.toString()}
          style={styles.fullWidth}
          renderItem={({ item }) => TransactionListItem(item)}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={_loadTransactions}
            />
          )}
        />

        <ActionButtons />
      </View>
    );
  }
}

AccountTransactions.propTypes = {
  loading: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
  current_account: PropTypes.object,
  actions: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.transactions,
    loading: state.transactions.loading,
    current_account: state.accounts.current_account
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactions);
