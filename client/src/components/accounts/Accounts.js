import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Page, List, ListItem, Icon } from 'react-onsenui';
import { Button } from 'reactstrap';
import * as AccountActions from '../../actions/account-actions';
import * as UiActions from '../../actions/ui-actions';

class Accounts extends Component {

    constructor(props) {
        super(props);

        props.actions.account.getAccounts();
    }

    editAccount (event, account) {
        event.stopPropagation();
        event.preventDefault();

        const fields = Object.keys(account).map(field => {
            return {
                name: field,
                value: account[field]
            };
        });
        this.props.actions.ui.setModalForm('account');
        this.props.actions.ui.updateModalFormFields(fields);
        this.props.actions.ui.showModalForm();
    }

    deleteAccount (event, account) {
        event.stopPropagation();
        event.preventDefault();

        if (account._id) {
            this.props.actions.account.deleteAccount(account._id)
                .then(this.props.actions.account.getAccounts);
        }
    }

    render () {
        return (
            <Page>
                <main>
                    <List
                        dataSource={this.props.accounts.sort((a,b) => {
                            if(a.name < b.name) return -1;
                            if(a.name > b.name) return 1;
                            return 0;
                        })}
                        renderRow={(account, index) => (
                            <Link
                                key={index}
                                to={`/accounts/${account._id}`}
                                params={{ id: account._id }}
                                onClick={() => {}}
                                style={{
                                    textDecoration: "none"
                                }}
                            >
                                <ListItem tappable>
                                    <div className="center">{account.name}</div>
                                    <div className="right" style={{padding: "12px"}}>
                                        <div className={'mr-3 text-right' + (account.balance < 0 ? ' text-danger' : '')}>
                                            ${Math.abs(account.balance)}
                                        </div>
                                        <Button outline color="danger" className="mr-2" style={{borderRadius: "100%"}} onClick={(event) => { this.deleteAccount(event, account) }} >
                                            <Icon icon="fa-trash" />
                                        </Button>
                                        <Button outline color="secondary" style={{borderRadius: "100%"}} onClick={(event) => { this.editAccount(event, account) }}>
                                            <Icon icon="fa-pencil" />
                                        </Button>
                                    </div>
                                </ListItem>
                            </Link>
                        )}
                    />
                </main>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts.accounts,
        modal_form: state.ui.modal_form
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