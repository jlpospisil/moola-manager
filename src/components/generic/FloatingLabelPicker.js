import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Picker, Animated, StyleSheet
} from 'react-native';
import styles, { dangerColor } from '../../lib/styles';

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

  handleFocus = () => this.setState({ isFocused: true });

  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { isFocused } = this.state;
    const { fontSize, color, fontWeight } = StyleSheet.flatten(styles.inputLabel);
    const {
      label, items, selectedValue, style, error, ...props
    } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 10,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [fontSize + 6, fontSize],
      }),
      color: error ? dangerColor : this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaaaaa', color],
      }),
      fontWeight: isFocused || !!selectedValue ? fontWeight : '100'
    };
    return (
      <View style={[styles.fullWidth, { paddingLeft: 5, paddingTop: 18 }, style]}>
        <Animated.Text style={labelStyle}>
          {isFocused || !!selectedValue ? label : `Select ${label}`}
        </Animated.Text>

        <Picker
          selectedValue={selectedValue}
          style={[styles.fullWidth, { height: 28 }]}
          itemStyle={{ fontSize: 20 }}
          {...props}
        >
          <Picker.Item key={null} label='' value={null} />
          { items.map(item => <Picker.Item key={item.value.toString()} label={item.label} value={item.value.toString()} />) }
        </Picker>
      </View>
    );
  }
}

FloatingLabelPicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
  items: PropTypes.array,
  style: PropTypes.object,
  error: PropTypes.bool
};

FloatingLabelPicker.defaultProps = {
  items: [],
  error: false
};

export default FloatingLabelPicker;
