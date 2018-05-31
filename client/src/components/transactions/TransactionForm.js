import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, Label, Input } from 'reactstrap';
import * as AccountActions from '../../actions/account-actions';
import * as UiActions from '../../actions/ui-actions';

class TransactionForm extends Component {

    constructor(props) {
        super(props);

        this.validateForm = this.validateForm.bind(this);

        if (props.accounts.length === 0) {
            props.actions.account.getAccounts();
        }
    }

    validateForm (event,field) {
        let fields = this.props.form_fields;
        field.value = event.target.value;

        this.props.actions.ui.updateModalFormFields(fields);

        const required_fields = fields.filter(field => field.required);
        const missing_fields = required_fields.filter(field => !field.value)

        if (missing_fields.length > 0 && this.props.can_submit) {
            this.props.actions.ui.setModalFormCanSubmit(false);
        }
        else if (missing_fields.length === 0 && !this.props.can_submit) {
            this.props.actions.ui.setModalFormCanSubmit(true);
        }
    }

    render () {
        return (
            <div>
                {
                    this.props.form_fields.filter(field => field.name === "_account").map((field, index) => (
                        <FormGroup key={field.name} style={{ display: (field.name === "_id") ? "none" : "block" }}>
                            <Label for={`transaction-form-${field.name}`} style={{textTransform: "capitalize"}}>{field.label || field.name}</Label>
                            <Input id={`transaction-form-${field.name}`} type="select" value={field.value} onChange={(event) => { this.validateForm(event, field) }}>
                                {
                                    this.props.accounts.map(account => (
                                        <option key={account._id} value={account._id}>{account.name}</option>
                                    ))
                                }
                            </Input>
                        </FormGroup>
                    ))
                }
                {
                    this.props.form_fields.filter(field => !['_account', '_vendor'].includes(field.name)).map((field, index) => (
                        <FormGroup key={field.name} style={{ display: (field.name === "_id") ? "none" : "block" }}>
                            <Label for={`transaction-form-${field.name}`} style={{textTransform: "capitalize"}}>{field.label || field.name}</Label>
                            <Input id={`transaction-form-${field.name}`} value={field.value} onChange={(event) => { this.validateForm(event, field) }}  />
                        </FormGroup>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        form_fields: state.ui.modal_form.fields,
        can_submit: state.ui.modal_form.can_submit,
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);