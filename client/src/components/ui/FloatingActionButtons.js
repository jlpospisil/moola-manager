import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as Ons from 'react-onsenui';
import * as UiActions from '../../actions/ui-actions';

class FloatingActionButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expandTimeout: null
        };
        this.collapsedFabs = this.collapsedFabs.bind(this);
        this.expandFabs = this.expandFabs.bind(this);
        this.collapseFabs = this.collapseFabs.bind(this);
        this.expandedFabs = this.expandedFabs.bind(this);
        this.expandFabsOnHover = this.expandFabsOnHover.bind(this);
        this.cancelExpandFabsOnHover = this.cancelExpandFabsOnHover.bind(this);
    }

    fabClicked (fab, event) {
        event.stopPropagation();

        const adding = fab ? fab.title.toLowerCase() : this.props.fabs.add_item;

        console.log({ fab, adding });
    }

    expandFabs (event) {
        if (!this.props.fabs.expandable) {
            this.fabClicked(null, event);
            return;
        }

        if (event && typeof event.stopPropagation === "function") {
            event.stopPropagation();
        }

        this.cancelExpandFabsOnHover();

        this.props.actions.expandFabs();
    }

    collapseFabs () {
        if (typeof this.props.actions.collapseFabs === "function") {
            setTimeout(this.props.actions.collapseFabs, 200);
        }
    }

    expandFabsOnHover () {
        if (!this.props.fabs.expandable) return;
        const expandTimeout = setTimeout(this.expandFabs, 300);
        this.setState({ expandTimeout });
    }

    cancelExpandFabsOnHover () {
        if (this.state.expandTimeout) {
            clearTimeout(this.state.expandTimeout);
        }
    }

    collapsedFabs () {
        return (
            <Ons.Fab
                position="bottom right"
                style={{
                    backgroundColor: "#4282cc",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.33)"
                }}
                onClick={this.expandFabs.bind(this)}
                onMouseEnter={this.expandFabsOnHover}
                onMouseLeave={this.cancelExpandFabsOnHover}
            >
                <Ons.Icon icon="md-plus" />
            </Ons.Fab>
        );
    }

    expandedFabs () {
        let fabs = [];

        if (Array.isArray(this.props.fab_items)) {
            fabs = this.props.fab_items.map((fab, index) => {
                return (
                    <div key={index} style={{
                        textAlign: "right",
                        marginTop: "15px"
                    }}>
                        <span className="tabbar__badge notification" style={{
                            marginRight: "10px",
                            borderRadius: 0,
                            backgroundColor: "#4a4a4a"
                        }}>
                            {fab.label}
                        </span>
                        <Ons.Fab onClick={this.fabClicked.bind(this, fab)}
                                 style={{
                                     backgroundColor: fab.backgroundColor ? fab.backgroundColor : "#4282cc",
                                     color: fab.color ? fab.color : "#ffffff",
                                     boxShadow: "0 2px 5px rgba(0,0,0,0.33)"
                                 }}
                        >
                            <Ons.Icon icon={fab.icon ? fab.icon : 'md-plus'} />
                        </Ons.Fab>
                    </div>
                );
            });
        }

        return (
            <div className="ons-fab fab--bottom__right" onMouseLeave={this.collapseFabs}>
                {fabs}
            </div>
        );
    }

    render () {
        if (this.props.fabs.expanded) {
            return this.expandedFabs();
        }

        return this.collapsedFabs();
    }
}

const mapStateToProps = (state) => {
    return {
        fabs: state.ui.fabs,
        fab_items: state.ui.fab_items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FloatingActionButtons);