import React from 'react';
import { View, Text } from 'react-native';
import FloatingLabelInput from '../generic/FloatingLabelInput';
import * as localStorage from '../../lib/app-local-storage';
import { Styles } from '../../lib';
import ActionButtons from './ActionButtons';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null
    };

    this.setRemoteUser = this.setRemoteUser.bind(this);
  }

  async componentDidMount() {
    this.setState({
      username: await localStorage.getItem('remote-username')
    });
  }

  setRemoteUser(val) {
    this.setState({ username: val });
    localStorage.setItem('remote-username', val);
  }

  render() {
    const { username } = this.state;

    return (
      <View style={Styles.container}>
        <Text>
            TODO: actually implement a home screen
        </Text>

        <View style={[Styles.fullWidth, { padding: 25, marginTop: 25 }]}>
          <FloatingLabelInput
            label='Username'
            value={username}
            onChangeText={this.setRemoteUser}
          />
        </View>

        <ActionButtons />
      </View>
    );
  }
}

export default Home;
