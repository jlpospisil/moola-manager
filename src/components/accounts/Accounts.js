import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Alert, View, FlatList, RefreshControl, TouchableOpacity, Text
} from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import styles from '../../lib/styles';
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

  render() {
    const { accounts, loading } = this.props;

    const AccountListItem = ({ name, description, balance }) => {
      const row = (
        <ListItem
          title={name}
          subtitle={description}
          hideChevron
          rightTitle={`$${balance}`}
          avatar={<Avatar rounded title={name.substr(0, 1)} source={null} />}
        />
      );

      return SwipeableRow({
        row,
        onOpen: () => { console.log('onOpen'); },
        onClose: () => { console.log('onClose'); }
      });
    };

    const SwipeableRow = ({ row, onOpen, onClose }) => {
      return (
        <Swipeable
          rightButtons={[
            <TouchableOpacity
              onPress={() => Alert.alert('Delete', 'Delete here')}
              style={[styles.listItemButton, { backgroundColor: 'rgba(0,0,0,0.03)' }]}
            >
              <Icon name='delete-forever' color='rgba(200,0,0,0.75)' size={28} />
            </TouchableOpacity>,
            <TouchableOpacity
              onPress={() => Alert.alert('Edit', 'Edit here')}
              style={[styles.listItemButton, { backgroundColor: 'rgba(0,0,0,0.05)' }]}
            >
              <Icon name='edit' color='rgba(97,97,97,0.75)' size={28} />
            </TouchableOpacity>
          ]}
          onRightButtonsOpenRelease={onOpen}
          onRightButtonsCloseRelease={onClose}
        >
          {row}
        </Swipeable>
      );
    };

    return (
      <View style={styles.container}>
        <FlatList
          data={accounts}
          keyExtractor={(item, index) => index.toString()}
          style={styles.fullWidth}
          renderItem={({ item }) => AccountListItem(item)}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={this.loadAccounts}
            />
          )}
        />

        <ActionButtons />
      </View>
    );
  }
}

Accounts.propTypes = {
  loading: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
