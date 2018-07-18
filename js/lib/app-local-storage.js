import { AsyncStorage } from 'react-native';

export const getItem = async (key) => {
    try {
        return await AsyncStorage.getItem(`@MoolaManager:${key}`);

    } catch (error) {
        console.log("Error getting value" + error);
    }
};

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(`@MoolaManager:${key}`, value);

    } catch (error) {
        console.log("Error setting value" + error);
    }
};