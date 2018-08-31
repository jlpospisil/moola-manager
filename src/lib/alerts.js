import Toast from 'react-native-root-toast';

const common_settings = {
  duration: Toast.durations.LONG,
  position: Toast.positions.TOP,
};

const success = (message, settings={}) => {
  Toast.show(message, {
    ...common_settings,
    backgroundColor: '#3c763d',
    ...settings
  });
};

const info = (message, settings={}) => {
  Toast.show(message, {
    ...common_settings,
    backgroundColor: '#31708f',
    ...settings
  });
};

const error = (message, settings={}) => {
  Toast.show(message, {
    ...common_settings,
    backgroundColor: '#a94442',
    ...settings
  });
};

export default {
  success,
  info,
  error
}