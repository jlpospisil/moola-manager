import * as UiActionTypes from './ui-action-types';

export const showLeftNav = () => {
    return {
        type: UiActionTypes.TOGGLE_NAV,
            open: true
    };
};

export const hideLeftNav = () => {
    return {
        type: UiActionTypes.TOGGLE_NAV,
        open: false
    };
};