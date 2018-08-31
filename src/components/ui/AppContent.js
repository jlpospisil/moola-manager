import React from 'react';
import PropTypes from 'prop-types';
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
    const { uiActions } = this.props;
    uiActions.updateCheckingAuth(true);
    await handleLogin();
    const token = await localStorage.getItem('auth-token');
    uiActions.updateSignedIn(token !== null);
    uiActions.updateCheckingAuth(false);
  }

  render() {
    const { checking_auth_status, signed_in } = this.props;

    if (signed_in) {
      return <Navigation />;
    }
    else {
      return <Login showForm={!checking_auth_status} />;
    }
  }
}

AppContent.propTypes = {
  checking_auth_status: PropTypes.bool.isRequired,
  signed_in: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    checking_auth_status: state.ui.checking_auth_status,
    signed_in: state.ui.signed_in
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(UiActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
