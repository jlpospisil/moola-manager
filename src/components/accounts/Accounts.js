import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import {
  Alert, View, FlatList, RefreshControl
} from 'react-native';
import styles from '../../lib/styles';
import SwipeableListItem from '../ui/SwipeableListItem';
import ActionButtons from '../ui/ActionButtons';
import * as AccountActions from '../../redux/actions/account-actions';

class Accounts extends React.Component {
  constructor(props) {
    super(props);

    this.loadAccounts = this.loadAccounts.bind(this);
  }

  componentWillMount() {
    this.loadAccounts();
  }

  loadAccounts() {
    const { actions } = this.props;
    actions.updateLoading(true);
    actions.loadAccounts();
  }

  _editAccount(account) {
    const { navigation } = this.props;
    navigation.navigate('EditAccount');
  }

  render() {
    const { accounts, loading, actions } = this.props;

    const AccountListItem = (account) => {
      const { updateCurrentAccount, deleteAccount } = actions;
      const {
        id, name, description, balance
      } = account;

      return (
        <SwipeableListItem
          title={name}
          subtitle={description}
          rightTitle={`$${balance}`}
          onPress={() => {}}
          onEdit={() => {
            updateCurrentAccount(account);
            this._editAccount(account);
          }}
          onDelete={() => deleteAccount(id)}
          onShare={() => Alert.alert('Share', 'Share here')}
        />
      );
    };

    return (
      <View style={styles.container}>
        <FlatList
          data={accounts}
          keyExtractor={item => item.id.toString()}
          style={styles.fullWidth}
          renderItem={({ item }) => AccountListItem(item)}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={this.loadAccounts}
            />
          )}
        />

        <ActionButtons fabs={['account']} />
      </View>
    );
  }
}

Accounts.propTypes = {
  loading: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts.accounts,
    loading: state.accounts.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AccountActions, dispatch)
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Accounts)
);
