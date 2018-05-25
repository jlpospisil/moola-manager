import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page, List, ListItem, Button } from 'react-onsenui';
import * as AccountActions from '../../actions/account-actions';
import * as UiActions from '../../actions/ui-actions';

class Accounts extends Component {

    constructor(props) {
        super(props);

        props.actions.account.getAccounts();
    }

    addNewAccount () {
        this.props.actions.ui.setModalForm('account');
        this.props.actions.ui.showModalForm();
        this.props.actions.ui.updateModalFormFields([
            { name: "name", required: true, value: "" }
        ]);
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
                                <div>{account.name}</div>
                            </ListItem>
                        )}
                    />
                    <div style={{padding: "15px"}}>
                        <Button onClick={this.addNewAccount.bind(this)} modifier="large">
                            Add Account
                        </Button>
                    </div>
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
        actions: {
            ui: bindActionCreators(UiActions, dispatch),
            account: bindActionCreators(AccountActions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);