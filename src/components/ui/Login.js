import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
/* eslint-disable-next-line object-curly-newline */
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import FloatingLabelInput from '../generic/FloatingLabelInput';
import styles from '../../lib/styles';
import * as localStorage from '../../lib/app-local-storage';
import { handleLogin } from '../../middleware/axios';
import * as UiActions from '../../redux/actions/ui-actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };

    this.loginAttempt = this.loginAttempt.bind(this);
  }

  async componentDidMount() {
    this.setState({
      username: await localStorage.getItem('remote-username'),
      password: await localStorage.getItem('remote-password')
    });
  }

  async loginAttempt() {
    /* eslint-disable-next-line object-curly-newline */
    const { username, password } = this.state;
    const { uiActions } = this.props;

    // this.setState({ checkingCredentials: true });
    uiActions.updateSignedIn(false);

    if (username && password) {
      await localStorage.setItem('remote-username', username);
      await localStorage.setItem('remote-password', password);
      await handleLogin();
    }

    const token = await localStorage.getItem('auth-token');

    // this.setState({ checkingCredentials: false });
    uiActions.updateSignedIn(token !== null);
  }

  render() {
    const { username, password } = this.state;
    const { showForm } = this.props;

    // Note: Android and iOS both interact with this prop differently. Android may behave better when given no behavior prop at all, whereas iOS is the opposite.
    // Options: height|position|padding     Usage: behavior='padding'
    // Resource: https://facebook.github.io/react-native/docs/keyboardavoidingview#behavior
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <View style={[styles.container, styles.padding20]}>
          <View style={[styles.container, styles.padding20]}>
            {/* eslint-disable-next-line global-require */}
            <Image source={require('../../assets/cow.png')} style={{ width: 100, height: 112.5 }} />
            <Text style={[styles.textPrimary, { fontWeight: '900', fontSize: 20 }]}>
                Moola Manager
            </Text>
          </View>

          {showForm && (
            <View style={[styles.container, styles.padding20]}>
              <FloatingLabelInput
                label='Username'
                autoFocus
                value={username}
                autoCapitalize='none'
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
                onChangeText={val => this.setState({ username: val })}
              />

              <FloatingLabelInput
                label='Password'
                value={password}
                returnKeyType='go'
                inputRef={(input) => { this.passwordInput = input; }}
                onSubmitEditing={this.loginAttempt}
                autoCapitalize='none'
                secureTextEntry
                onChangeText={val => this.setState({ password: val })}
              />
            </View>
          )}

          {showForm && (
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.loginAttempt}>
                <Text style={styles.buttonText}>
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Login.propTypes = {
  showForm: PropTypes.bool
};

Login.defaultProps = {
  showForm: true
};

const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(UiActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
