import React from 'react';
import PropTypes from 'prop-types';
import { Alert, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import styles from '../../lib/styles';


class SwipeableListItem extends React.PureComponent {
  render() {
    const {
      title, subtitle, rightTitle, onPress, hideAvatar, onDelete, onShare, onEdit, onRightButtonsOpenRelease, onRightButtonsCloseRelease
    } = this.props;

    const rightButtons = [];

    if (onDelete) {
      rightButtons.push((
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.listItemButton, { backgroundColor: 'rgba(217,0,0,0.8)' }]}
        >
          <Icon name='delete-forever' color='#ffffff' size={28} />
        </TouchableOpacity>
      ));
    }

    if (onShare) {
      rightButtons.push((
        <TouchableOpacity
          onPress={onShare}
          style={[styles.listItemButton, { backgroundColor: 'rgba(3,155,229,0.8)' }]}
        >
          <Icon name='share' color='#ffffff' size={28} />
        </TouchableOpacity>
      ));
    }

    if (onEdit) {
      rightButtons.push((
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.listItemButton, { backgroundColor: 'rgba(33,33,33,0.4)' }]}
        >
          <Icon name='edit' color='#ffffff' size={28} />
        </TouchableOpacity>
      ));
    }

    return (
      <Swipeable
        rightButtonWidth={65}
        rightButtons={rightButtons}
        onRightButtonsOpenRelease={onRightButtonsOpenRelease}
        onRightButtonsCloseRelease={onRightButtonsCloseRelease}
      >
        <ListItem
          title={title}
          subtitle={subtitle}
          hideChevron
          rightTitle={rightTitle}
          avatar={hideAvatar ? null : <Avatar rounded title={title.substr(0, 1)} source={null} />}
          onPress={onPress}
        />
      </Swipeable>
    );
  }
}

SwipeableListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  rightTitle: PropTypes.string,
  hideAvatar: PropTypes.bool,
  onPress: PropTypes.func,
  onDelete: PropTypes.func,
  onShare: PropTypes.func,
  onEdit: PropTypes.func,
  onRightButtonsOpenRelease: PropTypes.func,
  onRightButtonsCloseRelease: PropTypes.func
};

SwipeableListItem.defaultProps = {
  hideAvatar: false,
  onPress: () => {}
};

export default SwipeableListItem;
