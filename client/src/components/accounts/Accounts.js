import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page, List, ListItem, Icon } from 'react-onsenui';
import { Button } from 'reactstrap';
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
            { name: "name", required: true, value: "" },
            { name: "balance", required: false, value: "" }
        ]);
    }

    deleteAccount (account) {
        if (account._id) {
            this.props.actions.account.deleteAccount(account._id)
                .then(this.props.actions.account.getAccounts);
        }
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
                                <div className="center">{account.name}</div>
                                <div className="right" style={{padding: "12px"}}>
                                    <Button outline color="danger" className="mr-2" style={{borderRadius: "100%"}} onClick={() => { this.deleteAccount(account) }}>
                                        <Icon icon="fa-trash" />
                                    </Button>
                                    <Button outline color="secondary" style={{borderRadius: "100%"}}>
                                        <Icon icon="fa-pencil" />
                                    </Button>
                                </div>
                            </ListItem>
                        )}
                    />
                    <div style={{padding: "15px"}}>
                        <Button color="primary" size="lg" block onClick={this.addNewAccount.bind(this)}>
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