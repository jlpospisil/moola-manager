import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Splitter, SplitterContent, Page } from 'react-onsenui';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import * as UI from './ui';
import * as UiActions from '../actions/ui-actions';

class App extends Component {

    render () {
        return (
            <Splitter onClick={this.props.actions.collapseFabs}>
                <UI.LeftNavigation />

                <SplitterContent>
                    <Page renderToolbar={() => <UI.TopToolbar />} renderFixed={() => <UI.FloatingActionButtons />}>
                        <main style={{ padding: "15px" }}>
                            Swipe right to open the menu.
                        </main>
                    </Page>
                </SplitterContent>
            </Splitter>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
