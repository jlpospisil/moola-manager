import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import styles from '../../styles';
import ActionButtons from '../ui/ActionButtons';
import * as AccountActions from '../../redux/actions/account-actions';

class Accounts extends React.Component {
    componentWillMount () {
        this.props.actions.loadAccounts();
    }

    render() {
        const {accounts} = this.props;

        return (
            <View style={styles.container}>
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
                    style={styles.fullWidth}
                />

                <ActionButtons />
            </View>
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
