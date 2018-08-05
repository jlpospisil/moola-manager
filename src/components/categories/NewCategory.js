import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import styles from '../../lib/styles';

class NewCategory extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
            Create New Category
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // accounts: state.accounts.accounts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // actions: bindActionCreators(AccountActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCategory);
