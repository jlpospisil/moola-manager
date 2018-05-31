import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';
import * as UiActions from '../../actions/ui-actions';


class TopToolbar extends Component {
    constructor (props) {
        super(props);

        this.pageTitle = this.pageTitle.bind(this);
    }

    pageTitle () {
        const path = this.props.location.pathname.replace(/^\//, '');

        // Viewing root
        if (path === '') {
            return 'Moola Manager';
        }

        // Viewing specific account
        if (path.match(/accounts\/[^/]+/)) {
            return this.props.account.name;
        }

        // All other routes
        return path.replace(/^\//, '');
    }

    render () {
        return (
            <Toolbar className="bg-primary">
                <div className="left">
                    <ToolbarButton onClick={this.props.actions.showLeftNav}>
                        <Icon className="text-white" icon="fa-bars" />
                    </ToolbarButton>
                </div>
                <div className="center text-white" style={{textTransform: "capitalize"}}>{ this.pageTitle() }</div>
            </Toolbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.accounts.account,
        left_nav: state.ui.left_nav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopToolbar));