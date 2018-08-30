import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* eslint-disable-next-line object-curly-newline */
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import FloatingLabelInput from '../generic/FloatingLabelInput';
import styles from '../../lib/styles';
import * as localStorage from '../../lib/app-local-storage';
import { handleLogin } from '../../middleware/axios';
import * as UiActions from '../../redux/actions/ui-actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // checkingCredentials: false,
      remoteServer: null,
      username: null,
      password: null,
    };

    this.loginAttempt = this.loginAttempt.bind(this);
  }

  async componentDidMount() {
    this.setState({
      remoteServer: await localStorage.getItem('remote-server'),
      username: await localStorage.getItem('remote-username'),
      password: await localStorage.getItem('remote-password')
    });
  }

  async loginAttempt() {
    /* eslint-disable-next-line object-curly-newline */
    const { remoteServer, username, password } = this.state;
    const { uiActions } = this.props;

    // this.setState({ checkingCredentials: true });
    uiActions.updateSignedIn(false);

    if (remoteServer && username && password) {
      await localStorage.setItem('remote-server', remoteServer);
      await localStorage.setItem('remote-username', username);
      await localStorage.setItem('remote-password', password);
      await handleLogin();
    }

    const token = await localStorage.getItem('auth-token');

    // this.setState({ checkingCredentials: false });
    uiActions.updateSignedIn(token !== null);
  }

  render() {
    const { remoteServer, username, password } = this.state;

    // Note: Android and iOS both interact with this prop differently. Android may behave better when given no behavior prop at all, whereas iOS is the opposite.
    // Options: height|position|padding     Usage: behavior='padding'
    // Resource: https://facebook.github.io/react-native/docs/keyboardavoidingview#behavior
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={[styles.container, styles.padding20]}>
          <View style={[styles.container, styles.padding20]}>
            {/* eslint-disable-next-line global-require */}
            <Image source={require('../../assets/cow.png')} style={{ width: 100, height: 112.5 }} />
            <Text style={[styles.textPrimary, { fontWeight: '900', fontSize: 20 }]}>
                Moola Manager
            </Text>
          </View>

          <View style={[styles.container, styles.padding20]}>
            <FloatingLabelInput
              label='Remote Server'
              value={remoteServer}
              autoCapitalize='none'
              autoFocus
              onSubmitEditing={() => this.usernameInput.focus()}
              autoCorrect={false}
              keyboardType='email-address'
              returnKeyType='next'
              onChangeText={val => this.setState({ remoteServer: val })}
            />

            <FloatingLabelInput
              label='Username'
              value={username}
              autoCapitalize='none'
              inputRef={(input) => { this.usernameInput = input; }}
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

          <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.loginAttempt}>
              <Text style={styles.buttonText}>
                  LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(UiActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
