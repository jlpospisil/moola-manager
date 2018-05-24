import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';
import * as UiActions from '../../actions/ui-actions';


class TopToolbar extends Component {

    render () {
        return (
            <Toolbar>
                <div className="left">
                    <ToolbarButton onClick={this.props.actions.showLeftNav}>
                        <Icon icon="ion-navicon, material:md-menu" />
                    </ToolbarButton>
                </div>
                <div className="center">Moola Manager</div>
            </Toolbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        left_nav: state.ui.left_nav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);