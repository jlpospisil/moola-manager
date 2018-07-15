import * as React from 'react';
import { Icon } from 'react-native-elements';

const BottomNavIcon = name => ({ focused, tintColor }) => (
    <Icon
        name={name}
        color={tintColor}
        size={focused ? 26 : 24}
    />
);

export default BottomNavIcon;