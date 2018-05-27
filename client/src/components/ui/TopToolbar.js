import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';
import * as UiActions from '../../actions/ui-actions';


class TopToolbar extends Component {

    render () {
        return (
            <Toolbar className="bg-primary">
                <div className="left">
                    <ToolbarButton onClick={this.props.actions.showLeftNav}>
                        <Icon className="text-white" icon="fa-bars" />
                    </ToolbarButton>
                </div>
                <div className="center text-white" style={{textTransform: "capitalize"}}>{ this.props.path && this.props.path !== '/' ? this.props.path.replace(/^\//, '') : 'Moola Manager' }</div>
            </Toolbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.ui.path,
        left_nav: state.ui.left_nav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);