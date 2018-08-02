import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Alert, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView
} from 'react-native';
import * as localStorage from '../../lib/app-local-storage';
import { handleLogin } from '../../middleware/axios';
import * as UiActions from '../../redux/actions/ui-actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkingCredentials: false,
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
    const {
      remoteServer, username, password, checkingCredentials
    } = this.state;

    this.setState({ checkingCredentials: true });
    this.props.UiActions.updateSignedIn(false);

    if (remoteServer && username && password) {
      await localStorage.setItem('remote-server', remoteServer);
      await localStorage.setItem('remote-username', username);
      await localStorage.setItem('remote-password', password);
      await handleLogin();
    }

    const token = await localStorage.getItem('auth-token');

    this.setState({ checkingCredentials: false });
    this.props.UiActions.updateSignedIn(token !== null);
  }

  render() {
    const { remoteServer, username, password } = this.state;

    // Note: Android and iOS both interact with this prop differently. Android may behave better when given no behavior prop at all, whereas iOS is the opposite.
    // Options: height|position|padding     Usage: behavior='padding'
    // Resource: https://facebook.github.io/react-native/docs/keyboardavoidingview#behavior
    return (
      <KeyboardAvoidingView style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.innerContainer}>
            {/* eslint-disable-next-line global-require */}
            <Image source={require('../../assets/cow.png')} style={{ width: 100, height: 112.5 }} />
            <Text style={styles.logo}>
                Moola Manager
            </Text>
          </View>

          <TextInput
            value={remoteServer}
            style={styles.input}
            autoCapitalize='none'
            autoFocus
            onSubmitEditing={() => this.usernameInput.focus()}
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType='next'
            placeholder='Remote Server'
            placeholderTextColor='rgba(0,0,0,0.3)'
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={remoteServer => this.setState({ remoteServer })}
          />

          <TextInput
            value={username}
            style={styles.input}
            autoCapitalize='none'
            ref={input => this.usernameInput = input}
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType='next'
            placeholder='Username'
            placeholderTextColor='rgba(0,0,0,0.3)'
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={username => this.setState({ username })}
          />

          <TextInput
            value={password}
            style={styles.input}
            returnKeyType='go'
            ref={input => this.passwordInput = input}
            placeholder='Password'
            placeholderTextColor='rgba(0,0,0,0.3)'
            underlineColorAndroid='rgba(0,0,0,0)'
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />

          <TouchableOpacity style={styles.buttonContainer} onPress={this.loginAttempt}>
            <Text style={styles.buttonText}>
                LOGIN
            </Text>
          </TouchableOpacity>
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
    UiActions: bindActionCreators(UiActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEFF1'
  },
  innerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  logo: {
    color: '#4CAF50',
    fontWeight: '900',
    fontSize: 20
  },
  input:{
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: '#000000',
    marginBottom: 10,
    padding: 10
  },
  buttonContainer:{
    alignSelf: 'stretch',
    backgroundColor: '#607d8b',
    paddingVertical: 15,
    marginTop: 15
  },
  buttonText:{
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700'
  }
});
