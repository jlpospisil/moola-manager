import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Splitter, SplitterContent, Page } from 'react-onsenui';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import * as UI from './ui';
import * as UiActions from '../actions/ui-actions';
import Accounts from './accounts/Accounts';
import AccountTransactions from './accounts/AccountTransactions';
import Transactions from './transactions/Transactions';
import Budgets from './budgets/Budgets';
import Categories from './categories/Categories';
import Settings from './settings/Settings';

class App extends Component {

    constructor (props) {
        super(props);

        this.updateFabs = this.updateFabs.bind(this);

        this.updateFabs();
    }

    componentWillReceiveProps(nextProps) {
        this.updateFabs();
    }

    updateFabs () {
        this.props.actions.toggleFabsExpandable(window.location.pathname === "/");
    }

    render () {
        return (
            <BrowserRouter>
                <Page className="App">
                    <Splitter onClick={this.props.actions.collapseFabs}>
                        <UI.LeftNavigation />

                        <SplitterContent>
                            <Page
                                renderToolbar={() => <UI.TopToolbar />}
                                renderFixed={() => <UI.FloatingActionButtons />}
                                renderModal={() => <UI.ModalForm />}
                            >
                                <Switch>
                                    <Route exact path="/accounts" component={Accounts} />
                                    <Route exact path="/accounts/:id" component={AccountTransactions} />
                                    <Route exact path="/transactions" component={Transactions} />
                                    <Route exact path="/budgets" component={Budgets} />
                                    <Route exact path="/categories" component={Categories} />
                                    <Route exact path="/settings" component={Settings} />
                                    <Route exact path="/" />
                                    <Redirect to="/" />
                                </Switch>
                            </Page>
                        </SplitterContent>
                    </Splitter>
                </Page>
            </BrowserRouter>
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
