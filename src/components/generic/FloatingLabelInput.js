import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Animated,
  StyleSheet
} from 'react-native';
import styles, { primaryColor, dangerColor } from '../../lib/styles';


class FloatingLabelInput extends React.PureComponent {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    const { value } = this.props;
    this._animatedIsFocused = new Animated.Value(!value ? 0 : 1);
  }

  componentDidUpdate() {
    const { isFocused } = this.state;
    const { value } = this.props;

    Animated.timing(this._animatedIsFocused, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => this.setState({ isFocused: true });

  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { isFocused } = this.state;
    const { fontSize, color, fontWeight } = StyleSheet.flatten(styles.inputLabel);
    const {
      label, style, inputRef, value, error, ...props
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
      fontWeight: isFocused || !!value ? fontWeight : '100'
    };
    return (
      <View style={[styles.fullWidth, {  paddingTop: 18 }, style]}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          value={value}
          style={{
            height: 28,
            fontSize: 20,
            color: '#333333',
            paddingBottom: 2,
            borderBottomWidth: error || isFocused ? 2 : 1,
            borderBottomColor: error ? dangerColor : isFocused ? primaryColor : '#888888'
          }}
          ref={inputRef}
          underlineColorAndroid='transparent'
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}

FloatingLabelInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  inputRef: PropTypes.func,
  error: PropTypes.bool
};

FloatingLabelInput.defaultProps = {
  error: false
};

export default FloatingLabelInput;
