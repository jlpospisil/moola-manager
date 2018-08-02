import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class ActionButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fabs: [
        {
          key: 'account',
          title: 'New Account',
          icon: 'credit-card' ,
          onPress: () => alert('Add new account')
        },
        {
          key: 'transaction',
          title: 'New Transaction',
          icon: 'receipt',
          onPress: () => this.props.navigation.navigate('NewTransaction')
        }
      ]
    };
  }

  render() {
    const { fabs } = this.state;
    const primaryColor = '#607d8b';

    return (
      <ActionButton
        fixNativeFeedbackRadius
        offsetY={25}
        offsetX={15}
        buttonColor='#ff6d00'
        renderIcon={() => <Icon name='add' color='#fff' />}
        onPress={() => {
          console.log('TODO: add new transaction');
        }}
        onLongPress={() => {
          console.log('TODO: display other fabs here');
        }}
      >
        {
          fabs.map(fab => (
            <ActionButton.Item
              key={fab.key.toString()}
              title={fab.title}
              buttonColor='#fff'
              textStyle={{ color: primaryColor }}
              onPress={fab.onPress}
            >
              <Icon name={fab.icon} color={primaryColor} />
            </ActionButton.Item>
          ))
        }
      </ActionButton>
    );
  }
}

export default withNavigation(ActionButtons);
