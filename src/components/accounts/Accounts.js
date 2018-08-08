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
    const { accounts, loading, actions } = this.props;

    // TODO: split swipeable list item into a separate component
    const AccountListItem = ({
      id, name, description, balance
    }) => {
      return (
        <Swipeable
          rightButtonWidth={65}
          rightButtons={[
            <TouchableOpacity
              onPress={() => actions.deleteAccount(id)}
              style={[styles.listItemButton, { backgroundColor: 'rgba(217,0,0,0.8)' }]}
            >
              <Icon name='delete-forever' color='#ffffff' size={28} />
            </TouchableOpacity>,
            <TouchableOpacity
              onPress={() => Alert.alert('Share', 'Share here')}
              style={[styles.listItemButton, { backgroundColor: 'rgba(3,155,229,0.8)' }]}
            >
              <Icon name='share' color='#ffffff' size={28} />
            </TouchableOpacity>,
            <TouchableOpacity
              onPress={() => Alert.alert('Edit', 'Edit here')}
              style={[styles.listItemButton, { backgroundColor: 'rgba(33,33,33,0.4)' }]}
            >
              <Icon name='edit' color='#ffffff' size={28} />
            </TouchableOpacity>
          ]}
          onRightButtonsOpenRelease={() => { console.log('onOpen'); }}
          onRightButtonsCloseRelease={() => { console.log('onClose'); }}
        >
          <ListItem
            title={name}
            subtitle={description}
            hideChevron
            rightTitle={`$${balance}`}
            avatar={<Avatar rounded title={name.substr(0, 1)} source={null} />}
          />
        </Swipeable>
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
