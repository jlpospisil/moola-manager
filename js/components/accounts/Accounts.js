import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FlatList} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import * as AccountActions from '../../actions/account-actions';

class Accounts extends React.Component {
    componentDidMount () {
        // this.props.actions.loadAccounts();
    }

    render() {
        const {accounts} = this.props;

        return (
            <FlatList
                data={accounts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <ListItem
                        title={`${item.name} title`}
                        subtitle={`${item.name} subtitle`}
                        hideChevron={true}
                        rightTitle={`$${item.balance}`}
                        avatar={<Avatar rounded title={item.name.substr(0, 1)} source={null}/>}
                    />
                )}
            />
        );
    }
};

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts.accounts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AccountActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
