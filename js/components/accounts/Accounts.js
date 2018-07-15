import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

class Accounts extends React.Component {
  render() {
    return (
            <FlatList
                data={[
                    { id: "1", name: "Testing 123", balance: "21.08" },
                    { id: "2", name: "Testing 456", balance: "52.01" }
                ]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={`${item.name} title ${item.id}`}
                        subtitle={`${item.name} subtitle`}
                        hideChevron={true}
                        rightTitle={`$${item.balance}`}
                        avatar={<Avatar rounded title={item.name.substr(0,1)} source={null} />}
                    />
                )}
            />
    );
  }
};

const mapStateToProps = (state) => {
    return {
        // active: state.ui.active,
        // items: state.ui.navigation.bottom
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // actions: {
        //     ui: bindActionCreators(UiActions, dispatch)
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
