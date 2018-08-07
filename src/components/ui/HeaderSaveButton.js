import * as React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const HeaderSaveButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 20 }}>
    <Icon
      name='save'
      color='#ffffff'
    />
  </TouchableOpacity>
);

HeaderSaveButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default HeaderSaveButton;