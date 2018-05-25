import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, Label, Input } from 'reactstrap';
import * as AccountActions from '../../actions/account-actions';
import * as UiActions from '../../actions/ui-actions';

class NewAccountForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [
                { name: "name", required: true, value: "" }
            ]
        };
        this.validateForm = this.validateForm.bind(this);

    }

    validateForm (event,index) {
        let fields = this.state.fields;
        let field = fields[index];
        field.value = event.target.value;
        this.setState({ fields });

        const required_fields = fields.filter(field => field.required);
        const missing_fields = required_fields.filter(field => !field.value)

        if (missing_fields.length > 0 && this.props.can_submit) {
            console.log('1');
            this.props.actions.ui.setModalFormCanSubmit(false);
        }
        else if (missing_fields.length === 0 && !this.props.can_submit) {
            console.log('2');
            this.props.actions.ui.setModalFormCanSubmit(true);
        }
    }

    render () {
        return (
            <div>
                {
                    this.state.fields.map((field, index) => (
                        <FormGroup key={field.name}>
                            <Label for="accountName">Name</Label>
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