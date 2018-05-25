import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page } from 'react-onsenui';
import * as AccountActions from '../../actions/account-actions';

class Accounts extends Component {

    constructor(props) {
        super(props);

        props.actions.listAccounts().then(() => {
            console.log(this.props.accounts);
        });
    }

    render () {
        return (
            <Page>
                <main>
                    <h2>Accounts</h2>
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