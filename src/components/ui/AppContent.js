import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import styles from '../../lib/styles';
import * as localStorage from '../../lib/app-local-storage';
import * as UiActions from '../../redux/actions/ui-actions';
import { handleLogin } from '../../middleware/axios';
import Login from './Login';
import Navigation from './Navigation';

class AppContent extends React.Component {
  async componentDidMount() {
    this.props.UiActions.updateCheckingAuth(true);
    await handleLogin();
    const token = await localStorage.getItem('auth-token');
    this.props.UiActions.updateSignedIn(token !== null);
    this.props.UiActions.updateCheckingAuth(false);
  }

  render() {
    const { checking_auth_status, signed_in } = this.props;

    if (checking_auth_status) {
      return (
        <View style={styles.container}>
          <Text>
            TODO: add splash screen
          </Text>
        </View>
      );
    }
    else if (signed_in) {
      return <Navigation />;
    }
    else {
      return <Login />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    checking_auth_status: state.ui.checking_auth_status,
    signed_in: state.ui.signed_in
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UiActions: bindActionCreators(UiActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);