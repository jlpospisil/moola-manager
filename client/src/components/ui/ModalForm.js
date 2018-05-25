import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Modal, Card, Button, Icon } from 'react-onsenui';
import * as UiActions from '../../actions/ui-actions';
import NewAccountForm from '../accounts/NewAccountForm';

class TopToolbar extends Component {

    renderForm () {
        switch (this.props.modal_form.form) {
            case 'account':
                return <NewAccountForm />
            default:
                return <div>bummer</div>
        }
    }

    render () {
        return (
            <Modal
                isOpen={this.props.modal_form.open}
                onDeviceBackButton={this.props.actions.closeModalForm}
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
                        <Button onClick={this.props.actions.closeModalForm} style={{backgroundColor: "#ff0000", marginRight: "10px"}}>
                            <Icon icon='fa-ban' style={{marginRight: "10px"}} />
                            Cancel
                        </Button>
                        <Button onClick={() => {console.log('save item here')}} disabled={!this.props.modal_form.can_submit}>
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
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);