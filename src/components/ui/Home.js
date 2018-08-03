import React from 'react';
import { FormLabel, FormInput } from 'react-native-elements';
import { View, Text } from 'react-native';
import * as localStorage from '../../lib/app-local-storage';
import styles from '../../lib/styles';
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
      <View style={styles.container}>
        <Text>
            TODO: actually implement a home screen
        </Text>

        <View style={{ padding: 25, marginTop: 25 }}>
          <FormLabel>
                        Username
          </FormLabel>
          <FormInput value={username} onChangeText={this.setRemoteUser} />

        </View>

        <ActionButtons />
      </View>
    );
  }
}

export default Home;
