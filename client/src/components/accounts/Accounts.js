import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page, List, ListItem } from 'react-onsenui';
import * as AccountActions from '../../actions/account-actions';

class Accounts extends Component {

    constructor(props) {
        super(props);

        props.actions.getAccounts();
    }

    render () {
        return (
            <Page>
                <main>
                    <h2 className="title">Accounts</h2>
                    <List
                        dataSource={this.props.accounts}
                        renderRow={(account, index) => (
                            <ListItem key={index}>
                                {account.name}
                            </ListItem>
                        )}
                    />
                </main>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts.accounts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AccountActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);