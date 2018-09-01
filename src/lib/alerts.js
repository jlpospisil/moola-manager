import Toast from 'react-native-root-toast';
import { successColor, infoColor, dangerColor } from './styles';

const common_settings = {
  duration: Toast.durations.LONG,
  position: Toast.positions.TOP + 40,
};

const success = (message, settings={}) => {
  Toast.show(message, {
    ...common_settings,
    backgroundColor: successColor,
    ...settings
  });
};

const info = (message, settings={}) => {
  Toast.show(message, {
    ...common_settings,
    backgroundColor: infoColor,
    ...settings
  });
};

const error = (message, settings={}) => {
  Toast.show(message, {
    ...common_settings,
    backgroundColor: dangerColor,
    ...settings
  });
};

export default {
  success,
  info,
  error
}