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
                <Ons.SplitterSide
                    style={{
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                    }}
                    side='left'
                    width={300}
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
