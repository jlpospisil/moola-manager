import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SplitterSide, Page, Card, List, ListItem, Icon } from 'react-onsenui';
import * as UiActions from '../../actions/ui-actions';


class TopToolbar extends Component {

    render () {
        return (
            <SplitterSide
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
                <Page>
                    <Card className="bg-primary text-white" style={{margin: 0, padding: '50px 10px', borderRadius: 0, border: 'none', boxShadow: 'none'}}>
                        <div className="left">
                            TODO: Add header
                        </div>
                    </Card>
                    <List style={{backgroundImage: "none"}}
                        dataSource={this.props.menu_items}
                        renderRow={(item) => (
                            <Link
                                key={item.title}
                                to={`/${item.title.toLowerCase()}`}
                                onClick={this.props.actions.hideLeftNav}
                                style={{
                                    textDecoration: "none"
                                }}
                            >
                                <ListItem tappable modifier="nodivider">
                                    <div className="left">
                                        <Icon style={{color: '#888'}} icon={item.icon} fixedWidth />
                                    </div>
                                    <div className="center">
                                        {item.title}
                                    </div>
                                </ListItem>
                            </Link>
                        )}
                    />
                </Page>
            </SplitterSide>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu_items: state.ui.menu_items,
        left_nav: state.ui.left_nav,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);