import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Modal, Card, Icon } from 'react-onsenui';
import { Button } from 'reactstrap';
import * as UiActions from '../../actions/ui-actions';
import * as AccountActions from '../../actions/account-actions';
import AccountForm from '../accounts/AccountForm';

class ModalForm extends Component {

    saveForm () {
        const fields = this.props.modal_form.fields
            .reduce((obj, field) => {
                obj[field.name] = field.value;
                return obj;
            }, {});

        let action = null;

        switch (this.props.modal_form.form) {
            case 'account':
                console.log({ fields })
                if (fields._id) {
                    console.log('yes');
                    action = this.props.actions.account.updateAccount(fields)
                }
                else {
                    console.log('no');
                    action = this.props.actions.account.createAccount(fields)
                }
                action = action.then(this.props.actions.account.getAccounts);
                break;
            default:
                console.error('Invalid form type', this.props.modal_form.form);
        }

        if (action) {
            action.then(() => {
                this.props.actions.ui.closeModalForm();
            });
        }
    }

    renderForm () {
        switch (this.props.modal_form.form) {
            case 'account':
                return <AccountForm />
            default:
                return <div>bummer</div>
        }
    }

    render () {
        return (
            <Modal
                isOpen={this.props.modal_form.open}
                onDeviceBackButton={this.props.actions.ui.closeModalForm}
            >
                <Card style={{
                    minHeight: "250px",
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "stretch"
                }}>
                    <div className="title" style={{color: "#000000", textTransform: "capitalize"}}>
                        {this.props.modal_form.form}
                    </div>
                    <div className="content" style={{padding: "10px", flex: "1 1 auto"}}>
                        {this.renderForm()}
                    </div>
                    <div style={{textAlign: "right", marginTop: "15px"}}>
                        <Button color="danger" onClick={this.props.actions.ui.closeModalForm} style={{marginRight: "10px"}}>
                            <Icon icon='fa-ban' style={{marginRight: "10px"}} />
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.saveForm.bind(this)} disabled={!this.props.modal_form.can_submit}>
                            <Icon icon='fa-save' style={{marginRight: "10px"}} />
                            Save
                        </Button>
                    </div>
                </Card>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modal_form: state.ui.modal_form
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            ui: bindActionCreators(UiActions, dispatch),
            account: bindActionCreators(AccountActions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);