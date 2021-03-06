import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import * as AccountActions from '../../redux/actions/account-actions';

class ActionButtons extends React.Component {
  constructor(props) {
    super(props);

    const { navigation, actions } = this.props;

    this.state = {
      availableFabs: [
        {
          key: 'account',
          title: 'New Account',
          icon: 'credit-card' ,
          onPress: () => {
            actions.accounts.clearCurrentAccount();
            navigation.navigate('NewAccount');
          }
        },
        {
          key: 'category',
          title: 'New Category',
          icon: 'folder' ,
          onPress: () => navigation.navigate('NewCategory')
        },
        {
          key: 'transaction',
          title: 'New Transaction',
          icon: 'receipt',
          onPress: () => navigation.navigate('NewTransaction')
        }
      ]
    };
  }

  render() {
    const { availableFabs } = this.state;
    const { navigation, fabs } = this.props;
    const additionalButtonColor = 'rgba(97,97,97,0.75)';
    const visibleFabs = availableFabs.filter(fab => fabs.includes(fab.key) || (fabs.length > 0 && fab.key === 'transaction'));

    return (
      <ActionButton
        fixNativeFeedbackRadius
        offsetY={25}
        offsetX={15}
        degrees={visibleFabs.length === 0 ? 0 : 135}
        buttonColor='#fb8c00'
        renderIcon={() => <Icon name='add' color='#fff' />}
        onPress={() => {
          if (visibleFabs.length === 0) {
            navigation.navigate('NewTransaction');
          }
        }}
      >
        {
          visibleFabs.map(fab => (
            <ActionButton.Item
              key={fab.key.toString()}
              title={fab.title}
              buttonColor='#fff'
              textStyle={{ color: additionalButtonColor }}
              onPress={fab.onPress}
            >
              <Icon name={fab.icon} color={additionalButtonColor} />
            </ActionButton.Item>
          ))
        }
      </ActionButton>
    );
  }
}

ActionButtons.propTypes = {
  navigation: PropTypes.object.isRequired,
  fabs: PropTypes.array,
  actions: PropTypes.object.isRequired
};

ActionButtons.defaultProps = {
  fabs: []
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      accounts: bindActionCreators(AccountActions, dispatch)
    }
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ActionButtons)
);
