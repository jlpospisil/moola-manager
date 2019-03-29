import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform, View, Picker, Animated, StyleSheet, ActionSheetIOS, TouchableOpacity, Text,
} from 'react-native';
import styles, { dangerColor, primaryColor } from '../../lib/styles';

class FloatingLabelPicker extends React.PureComponent {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    const { selectedValue } = this.props;
    this._animatedIsFocused = new Animated.Value(!selectedValue ? 0 : 1);
  }

  componentDidUpdate() {
    const { isFocused } = this.state;
    const { selectedValue } = this.props;

    Animated.timing(this._animatedIsFocused, {
      toValue: isFocused || !!selectedValue ? 1 : 0,
      duration: 200,
    }).start();
  }

  showActionSheet = () => {
    const { items = [], onValueChange = () => {} } = this.props;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          ...items.map(i => i.label),
          'Cancel',
        ],
        cancelButtonIndex: items.length,
      },
      (itemIndex) => {
        const item = items[itemIndex] || null;
        if (item) {
          onValueChange(item.value.toString());
        }
      }
    );
  };

  render() {
    const { isFocused } = this.state;
    const { fontSize, color, fontWeight } = StyleSheet.flatten(styles.inputLabel);
    const {
      label, items, selectedValue, style, error, ...props
    } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [fontSize + 6, fontSize],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaaaaa', color],
      }),
      fontWeight: isFocused || !!selectedValue ? fontWeight : '100'
    };
    const selectedItem = items.find(i => selectedValue && i.value.toString() === selectedValue.toString());
    const selectedItemLabel = selectedItem ? selectedItem.label : null;
    return (
      <View style={[
        styles.fullWidth,
        {
          paddingTop: 18,
          borderBottomWidth: error ? 2 : 1,
          borderBottomColor: error ? dangerColor : '#888888'
        },
        style]}
      >
        <Animated.Text style={labelStyle}>
          {isFocused || !!selectedValue ? label : `Select ${label}`}
        </Animated.Text>

        {/* On android, display a picker */}
        {Platform.OS !== 'ios' && (
          <Picker
            selectedValue={selectedValue ? selectedValue.toString() : null}
            style={{ height: 28 }}
            itemStyle={{ fontSize: 20 }}
            {...props}
          >
            <Picker.Item key={null} label='' value={null} />
            { items.map(item => <Picker.Item key={item.value.toString()} label={item.label} value={item.value.toString()} />) }
          </Picker>
        )}

        {/* The picker does not function or look right on ios, so use ActionSheetIOS instead */}
        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={this.showActionSheet}>
            <Text
              {...props}
              style={{
                height: 28,
                fontSize: 20,
                color: '#333333',
              }}
              underlineColorAndroid='transparent'
            >
              { selectedItemLabel }
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

FloatingLabelPicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  items: PropTypes.array,
  style: PropTypes.object,
  error: PropTypes.bool,
  onValueChange: PropTypes.func,
};

FloatingLabelPicker.defaultProps = {
  items: [],
  error: false,
  onValueChange: () => {},
};

export default FloatingLabelPicker;
