import React from 'react';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { View, Text } from 'react-native';
import * as localStorage from '../../lib/app-local-storage';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            server: null,
            username: null,
            password: null
        };

        this.setRemoteServer = this.setRemoteServer.bind(this);
        this.setRemoteUser = this.setRemoteUser.bind(this);
        this.setRemotePw = this.setRemotePw.bind(this);

        // localStorage.clear();   // clear local storage
    }

    async componentDidMount () {
        this.setState({
            server: await localStorage.getItem("remote-server"),
            username: await localStorage.getItem("remote-username"),
            password: await localStorage.getItem("remote-password")
        });
    }

    setRemoteServer (val) {
        this.setState({ server: val });
        localStorage.setItem('remote-server', val);
    }

    setRemoteUser (val) {
        this.setState({ username: val });
        localStorage.setItem('remote-username', val);
    }

    setRemotePw (val) {
        this.setState({ password: val });
        localStorage.setItem('remote-password', val);
    }

    render() {
        const { server, username, password } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Text>
                    TODO: move this to settings and create home screen
                </Text>

                <View style={{ padding: 25, marginTop: 25 }}>
                    <FormLabel>Remote Server</FormLabel>
                    <FormInput value={server} onChangeText={this.setRemoteServer} />

                    <FormLabel>Username</FormLabel>
                    <FormInput value={username} onChangeText={this.setRemoteUser} />

                    <FormLabel>Password</FormLabel>
                    <FormInput value={password} onChangeText={this.setRemotePw} />
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        // active: state.ui.active,
        // items: state.ui.navigation.bottom
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // actions: {
        //     ui: bindActionCreators(UiActions, dispatch)
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
