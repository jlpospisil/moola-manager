import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import styles from '../../lib/styles';
import ActionButtons from '../ui/ActionButtons';

class Categories extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
                Categories: Coming Soon
        </Text>

        <ActionButtons fabs={['category']} />
      </View>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
