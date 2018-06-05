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
                        dataSource={this.props.left_nav.items}
                        renderRow={(item) => (
                            <Link
                                key={item.item}
                                to={item.path}
                                onClick={this.props.actions.hideLeftNav}
                                style={{
                                    textDecoration: "none"
                                }}
                            >
                                <ListItem tappable modifier="nodivider">
                                    <div className="left">
                                        <Icon style={{color: '#888'}} icon={this.props.icons[item.item]} fixedWidth />
                                    </div>
                                    <div className="center">
                                        {item.label}
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
        icons: state.ui.icons,
        left_nav: state.ui.left_nav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);