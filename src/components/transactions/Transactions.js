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
import * as TransactionActions from '../../redux/actions/transaction-actions';

class Transactions extends React.Component {
  render() {
    const { transactions, loading } = this.props;

    const TransactionListItem = (transaction) => {
      const {
        id, name, description, amount
      } = transaction;

      return (
        <SwipeableListItem
          title={name}
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
              onRefresh={() => {}}
            />
          )}
        />

        <ActionButtons />
      </View>
    );
  }
}

Transactions.propTypes = {
  loading: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.transactions,
    loading: state.transactions.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(TransactionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
