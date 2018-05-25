import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Ons from 'react-onsenui';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import * as UI from './ui';
import * as UiActions from '../actions/ui-actions';

class App extends Component {

    constructor (props) {
        super(props);

        this.renderFabs=this.renderFabs.bind(this);
    }

    renderLeftNav () {
        return (
            <UI.TopToolbar />
        );
    }

    renderFabs () {
        return <UI.FloatingActionButtons
            expanded={this.props.fabs.expanded}
            onExpand={this.props.actions.expandFabs}
            onCollapse={this.props.actions.collapseFabs}
            fabItems={this.props.fab_items}
            onFabClick={this.fabClicked}
        />;
    }

    fabClicked (fab) {
        console.log({ fab });
    }

    render () {
        return (
            <Ons.Splitter onClick={this.props.actions.collapseFabs}>
                <UI.LeftNavigation />

                <Ons.SplitterContent>
                    <Ons.Page renderToolbar={this.renderLeftNav} renderFixed={this.renderFabs}>
                        <section style={{margin: '16px'}}>
                            <p>
                                Swipe right to open the menu.
                            </p>
                        </section>
                    </Ons.Page>
                </Ons.SplitterContent>
            </Ons.Splitter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menu_items: state.ui.menu_items,
        left_nav: state.ui.left_nav,
        fabs: state.ui.fabs,
        fab_items: state.ui.fab_items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
