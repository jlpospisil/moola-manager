import { AsyncStorage } from 'react-native';

const STORE = '@MoolaManager';

const keyWithStore = (key) => {
  return `${STORE}:${key}`;
};

export const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(keyWithStore(key));
  } catch (error) {
    console.log(`Error getting key: ${error}`);
  }
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(keyWithStore(key), value);
  } catch (error) {
    console.log(`Error setting key: ${error}`);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(keyWithStore(key));
  } catch (error) {
    console.log(`Error removing key: ${error}`);
  }
};

export const clear = () => {
  try {
    AsyncStorage.clear();
  } catch (error) {

  }
};
