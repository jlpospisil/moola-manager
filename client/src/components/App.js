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
        this.state = {
            fabMenuIsOpen: false
        };
        this.showFabMenu=this.showFabMenu.bind(this);
        this.hideFabMenu=this.hideFabMenu.bind(this);
        this.renderFabs=this.renderFabs.bind(this);
    }

    renderFabs () {
        return <UI.FloatingActionButtons
            expanded={this.state.fabMenuIsOpen}
            onExpand={this.showFabMenu}
            onCollapse={this.hideFabMenu}
            fabItems={[
                {
                    label: 'Add Account',
                    backgroundColor: '#cccccc',
                    icon: 'md-accounts-list',
                    color: '#333333',
                    url: ''
                },
                {
                    label: 'Add Category',
                    backgroundColor: '#cccccc',
                    color: '#555555',
                    icon: 'md-folder',
                    url: ''
                },
                {
                    label: 'Add Transaction',
                    icon: 'md-receipt',
                    url: ''
                }
            ]}
            onFabClick={this.fabClicked}
        />;
    }

    showFabMenu () {
        this.setState({ fabMenuIsOpen: true });
    }

    hideFabMenu () {
        this.setState({ fabMenuIsOpen: false });
    }

    fabClicked (fab) {
        console.log({ fab });
    }

    render () {
        return (
            <Ons.Splitter onClick={this.hideFabMenu}>
                <Ons.SplitterSide
                    style={{
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                    }}
                    side='left'
                    width={200}
                    collapse={true}
                    swipeable={true}
                    isOpen={this.props.left_nav.open}
                    onClose={this.props.actions.hideLeftNav}
                    onOpen={this.props.actions.showLeftNav}
                >
                    <Ons.Page>
                        <Ons.Card style={{margin: 0, padding: '50px 10px', borderRadius: 0}}>
                            <div className="left">
                                TODO: Add background image here
                            </div>
                        </Ons.Card>
                        <Ons.List
                            dataSource={this.props.menu_items}
                            renderRow={(item) => (
                                <Ons.ListItem key={item.title} onClick={this.props.actions.hideLeftNav} tappable>
                                    <div className="left">
                                        <Ons.Icon style={{color: '#888'}} icon={item.icon} fixedWidth />
                                    </div>
                                    <div className="center">
                                        {item.title}
                                    </div>
                                </Ons.ListItem>
                            )}
                        />
                    </Ons.Page>
                </Ons.SplitterSide>
                <Ons.SplitterContent>
                    <Ons.Page renderToolbar={() => { return <UI.TopToolbar /> }} renderFixed={this.renderFabs}>
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
    console.log('here', state.ui);
    return {
        menu_items: state.ui.menu_items,
        left_nav: state.ui.left_nav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
