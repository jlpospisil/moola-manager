import React, { Component } from 'react';
import '../css/App.css';
import * as Ons from 'react-onsenui';
import AppFabs from './AppFabs';

export default class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            leftMenuIsOpen: false,
            fabMenuIsOpen: false
        };
        this.hideMenu=this.hideMenu.bind(this);
        this.showMenu=this.showMenu.bind(this);
        this.renderToolbar=this.renderToolbar.bind(this);
        this.showFabMenu=this.showFabMenu.bind(this);
        this.hideFabMenu=this.hideFabMenu.bind(this);
        this.renderFabs=this.renderFabs.bind(this);
    }

    hideMenu () {
        this.setState({ leftMenuIsOpen: false });
    }

    showMenu () {
        this.setState({ leftMenuIsOpen: true });
    }

    renderToolbar () {
        return (
            <Ons.Toolbar>
                <div className="left">
                    <Ons.ToolbarButton onClick={this.showMenu}>
                        <Ons.Icon icon="ion-navicon, material:md-menu" />
                    </Ons.ToolbarButton>
                </div>
                <div className="center">Moola Manager</div>
            </Ons.Toolbar>
        );
    }

    renderFabs () {
        return <AppFabs
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
            <Ons.Splitter>
                <Ons.SplitterSide
                    style={{
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                    }}
                    side='left'
                    width={200}
                    collapse={true}
                    swipeable={true}
                    isOpen={this.state.leftMenuIsOpen}
                    onClose={this.hideMenu}
                    onOpen={this.showMenu}
                >
                    <Ons.Page>
                        <Ons.Card style={{margin: 0, padding: '50px 10px', borderRadius: 0}}>
                            <div className="left">
                                TODO: Add background image here
                            </div>
                        </Ons.Card>
                        <Ons.List
                            dataSource={[
                                {
                                    title: 'Accounts',
                                    icon: 'md-accounts-list'
                                },
                                {
                                    title: 'Transactions',
                                    icon: 'md-receipt'
                                },
                                {
                                    title: 'Budgets',
                                    icon: 'md-chart'
                                },
                                {
                                    title: 'Categories',
                                    icon: 'md-folder'
                                },
                                {
                                    title: 'Settings',
                                    icon: 'md-settings'
                                }
                            ]}
                            renderRow={(item) => (
                                <Ons.ListItem key={item.title} onClick={this.hideMenu} tappable>
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
                    <Ons.Page renderToolbar={this.renderToolbar} renderFixed={this.renderFabs}>
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
