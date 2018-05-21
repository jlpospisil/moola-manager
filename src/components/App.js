import React, { Component } from 'react';
import '../css/App.css';
import * as Ons from 'react-onsenui';


class App extends Component {

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
                <div className='left'>
                    <Ons.ToolbarButton onClick={this.showMenu}>
                        <Ons.Icon icon='ion-navicon, material:md-menu' />
                    </Ons.ToolbarButton>
                </div>
                <div className='center'>Moola Manager</div>
            </Ons.Toolbar>
        );
    }

    showFabMenu () {
        this.setState({ fabMenuIsOpen: true });
    }

    hideFabMenu () {
        this.setState({ fabMenuIsOpen: false });
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
                                    icon: { default: '', material: '' }
                                },
                                {
                                    title: 'Transactions',
                                    icon: { default: '', material: '' }
                                },
                                {
                                    title: 'Budgets',
                                    icon: { default: '', material: '' }
                                },
                                {
                                    title: 'Categories',
                                    icon: { default: '', material: '' }
                                },
                                {
                                    title: 'Settings',
                                    icon: { default: 'ion-settings', material: 'md-settings' }
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
                    <Ons.Page renderToolbar={this.renderToolbar}>
                        <section style={{margin: '16px'}}>
                            <p>
                                Swipe right to open the menu.
                            </p>
                        </section>
                    </Ons.Page>
                </Ons.SplitterContent>
                <Ons.Fab position="bottom right" style={{backgroundColor: '#4282cc'}}>
                    <Ons.Icon icon="md-plus" />
                </Ons.Fab>
            </Ons.Splitter>
        );
    }
}

export default App;
