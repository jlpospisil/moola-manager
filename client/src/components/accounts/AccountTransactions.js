import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page, List, ListItem, Icon } from 'react-onsenui';
import { Row, Col, Button } from 'reactstrap';
import * as AccountActions from '../../actions/account-actions';
import * as UiActions from '../../actions/ui-actions';

class AccountTransactions extends Component {

    constructor(props) {
        super(props);

        const {id} = props.match.params;

        props.actions.account.getAccountTransactions(id);
    }

    deleteTransaction (transaction) {
        alert('TODO: delete transaction');
    }

    editTransaction (transaction) {
        alert('TODO: edit transaction');
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
                                    <Col xs="4" sm="3" md="2">${transaction.amount}</Col>
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
        transactions: state.accounts.account.transactions,
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactions);