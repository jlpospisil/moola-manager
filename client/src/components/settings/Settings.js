import React, { Component } from 'react';
import { Page, List, ListItem, Switch } from 'react-onsenui';


export default class Settings extends Component {
    constructor (props) {
        super(props);

        this.state = {
            storage_type: window.localStorage.getItem('storage_type'),
            remote_server: window.localStorage.getItem('remote_server'),
            username: window.localStorage.getItem('username'),
            password: window.localStorage.getItem('password')
        };

        this.updateRemoteSync = this.updateRemoteSync.bind(this);
    }

    updateRemoteSync (event) {
        const storage_type = event.target.checked ? "remote" : "local";
        this.setState({ storage_type });
        window.localStorage.setItem('storage_type', storage_type);
    }

    render () {
        return (
            <Page>
                <main>
                    <List>
                        <ListItem>
                            <div className="center">
                                Use remote server
                            </div>
                            <div className="right">
                                <Switch checked={this.state.storage_type === "remote"} onChange={this.updateRemoteSync} />
                            </div>
                        </ListItem>

                        {this.state.storage_type === "remote" && (
                            <ListItem>
                                <ListItem modifier="nodivider" style={{ padding: 0 }}>
                                    <div className="center" style={{ padding: "0 0 10px 0", minHeight: 0 }}>
                                        Remote server address
                                    </div>
                                </ListItem>
                                <ListItem modifier="nodivider" style={{ padding: 0 }}>
                                    <div className="center" style={{ padding: "0 0 0 10px", minHeight: 0, fontSize: "0.8em", color: "#888888" }}>
                                        {this.state.remote_server ? this.state.remote_server : "Not set"}
                                    </div>
                                </ListItem>
                            </ListItem>
                        )}

                        {this.state.storage_type === "remote" && (
                            <ListItem>
                                <ListItem modifier="nodivider" style={{ padding: 0 }}>
                                    <div className="center" style={{ padding: "0 0 10px 0", minHeight: 0 }}>
                                        Username
                                    </div>
                                </ListItem>
                                <ListItem modifier="nodivider" style={{ padding: 0 }}>
                                    <div className="center" style={{ padding: "0 0 0 10px", minHeight: 0, fontSize: "0.8em", color: "#888888" }}>
                                        {this.state.username ? this.state.username : "Not set"}
                                    </div>
                                </ListItem>
                            </ListItem>
                        )}

                        {this.state.storage_type === "remote" && (
                            <ListItem>
                                <ListItem modifier="nodivider" style={{ padding: 0 }}>
                                    <div className="center" style={{ padding: "0 0 10px 0", minHeight: 0 }}>
                                        Password
                                    </div>
                                </ListItem>
                                <ListItem modifier="nodivider" style={{ padding: 0 }}>
                                    <div className="center" style={{ padding: "0 0 0 10px", minHeight: 0, fontSize: "0.8em", color: "#888888" }}>
                                        {this.state.password ? "••••••••••••" : "Not set"}
                                    </div>
                                </ListItem>
                            </ListItem>
                        )}
                    </List>
                </main>
            </Page>
        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         accounts: state.accounts.accounts
//     };
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         actions: bindActionCreators(AccountActions, dispatch)
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Accounts);