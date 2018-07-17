import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { View, Text } from 'react-native';

class Home extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>
                Home: Coming Soon
            </Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
