import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList, RefreshControl } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
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

    return (
      <View style={styles.container}>
        <FlatList
          data={accounts}
          keyExtractor={(item, index) => index.toString()}
          style={styles.fullWidth}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name} title`}
              subtitle={`${item.name} subtitle`}
              hideChevron
              rightTitle={`$${item.balance}`}
              avatar={<Avatar rounded title={item.name.substr(0, 1)} source={null} />}
            />
          )}
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
