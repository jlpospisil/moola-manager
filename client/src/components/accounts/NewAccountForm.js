import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, Label, Input } from 'reactstrap';
import * as AccountActions from '../../actions/account-actions';
import * as UiActions from '../../actions/ui-actions';

class NewAccountForm extends Component {

    constructor(props) {
        super(props);

        this.validateForm = this.validateForm.bind(this);

    }

    validateForm (event,index) {
        let fields = this.props.form_fields;
        let field = fields[index];
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
                    this.props.form_fields.map((field, index) => (
                        <FormGroup key={field.name}>
                            <Label for="accountName" style={{textTransform: "capitalize"}}>{field.label || field.name}</Label>
                            <Input id="accountName" value={field.value} onChange={(event) => { this.validateForm(event, index) }}  />
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
        account: state.accounts.account
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

export default connect(mapStateToProps, mapDispatchToProps)(NewAccountForm);