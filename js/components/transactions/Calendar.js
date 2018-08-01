import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { View, Text } from 'react-native';
import styles from '../../styles';
import ActionButtons from '../ui/ActionButtons';

class Calendar extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <Text>
                Calendar: Coming Soon
            </Text>

            <ActionButtons />
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
