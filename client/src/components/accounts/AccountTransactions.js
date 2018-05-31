import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page, List, ListItem, Icon } from 'react-onsenui';
import { Row, Col, Button } from 'reactstrap';
import * as AccountActions from '../../actions/account-actions';
import * as TransactionActions from '../../actions/transaction-actions';
import * as UiActions from '../../actions/ui-actions';

class AccountTransactions extends Component {

    constructor(props) {
        super(props);

        this.deleteTransaction = this.deleteTransaction.bind(this);
        this.getAccountWithTransactions = this.getAccountWithTransactions.bind(this);

        this.getAccountWithTransactions();
    }

    getAccountWithTransactions () {
        const {id} = this.props.match.params;
        this.props.actions.account.getAccount(id).then(this.props.actions.account.getAccountTransactions(id));
    }

    deleteTransaction (transaction) {
        this.props.actions.transaction.deleteTransaction(transaction._id)
            .then(this.getAccountWithTransactions);
    }

    editTransaction (transaction) {
        const fields = Object.keys(transaction).map(field => {
            return {
                name: field,
                value: transaction[field]
            };
        });
        this.props.actions.ui.setModalForm('transaction');
        this.props.actions.ui.updateModalFormFields(fields);
        this.props.actions.ui.showModalForm();
    }

    render () {
        return (
            <Page>
                <main>
                    <List
                        dataSource={this.props.transactions.sort((a,b) => {
                            if(a.name < b.name) return -1;
                            if(a.name > b.name) return 1;
                            return 0;
                        })}
                        renderRow={(transaction, index) => (
                            <ListItem key={index}>
                                <Row className="center">
                                    <Col xs="8" sm="9" md="10">Vendor Name</Col>
                                    <Col xs="4" sm="3" md="2" className="text-right pr-5">${transaction.amount}</Col>
                                </Row>
                                <div className="right" style={{padding: "12px"}}>
                                    <Button outline color="danger" className="mr-2" style={{borderRadius: "100%"}} onClick={() => { this.deleteTransaction(transaction) }}>
                                        <Icon icon="fa-trash" />
                                    </Button>
                                    <Button outline color="secondary" style={{borderRadius: "100%"}} onClick={() => { this.editTransaction(transaction) }}>
                                        <Icon icon="fa-pencil" />
                                    </Button>
                                </div>
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
        transactions: Array.isArray(state.accounts.account.transactions) ? state.accounts.account.transactions : [],
        modal_form: state.ui.modal_form,
        account: state.accounts.account
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            ui: bindActionCreators(UiActions, dispatch),
            account: bindActionCreators(AccountActions, dispatch),
            transaction: bindActionCreators(TransactionActions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactions);