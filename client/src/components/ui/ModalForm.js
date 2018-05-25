import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Modal, Card, Button, Icon } from 'react-onsenui';
import * as UiActions from '../../actions/ui-actions';


class TopToolbar extends Component {

    render () {
        return (
            <Modal
                isOpen={this.props.modal_form.open}
            >
                <Card>
                    <div className="title" style={{color: "#000000"}}>Modal Form</div>
                    <div className="content">
                        here is the content
                    </div>
                    <div style={{textAlign: "right"}}>
                        <Button onClick={this.props.actions.closeModalForm} style={{backgroundColor: "#ff0000", marginRight: "10px"}}>
                            <Icon icon='fa-ban' style={{marginRight: "10px"}} />
                            Cancel
                        </Button>
                        <Button onClick={() => {console.log('save item here')}} disabled={true}>
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