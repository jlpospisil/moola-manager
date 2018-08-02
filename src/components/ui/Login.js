import React, { Component } from 'react';
import {
  Alert, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remoteServer: null,
      username: null,
      password: null,
    };

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    const { remoteServer, username, password } = this.state;
    Alert.alert('Credentials', `${remoteServer} ~ ${username} ~ ${password}`);
  }

  render() {
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
            style={styles.input}
            returnKeyType='go'
            ref={input => this.passwordInput = input}
            placeholder='Password'
            placeholderTextColor='rgba(0,0,0,0.3)'
            underlineColorAndroid='rgba(0,0,0,0)'
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />

          <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
            <Text style={styles.buttonText}>
                            LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

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
    paddingVertical: 15
  },
  buttonText:{
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700'
  }
});
