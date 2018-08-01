import * as React from 'react';
import { Icon } from 'react-native-elements';

const NavigationIcon = name => ({ focused, tintColor }) => (
  <Icon
    name={name}
    color={tintColor}
    size={focused ? 25 : 24}
  />
);

export default NavigationIcon;
