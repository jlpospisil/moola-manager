import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const NavigationIcon = name => ({ focused, tintColor }) => (
  <Icon
    name={name}
    color={tintColor}
    size={focused ? 25 : 24}
  />
);

const NavIcon = ({ focused, tintColor }) => (
  <Icon
    name={name}
    color={tintColor}
    size={focused ? 25 : 24}
  />
);

NavIcon.propTypes = {
  focused: PropTypes.bool,
  tintColor: PropTypes.string
};

export default NavigationIcon;
