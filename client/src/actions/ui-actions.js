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

export const expandFabs = () => {
    return {
        type: UiActionTypes.TOGGLE_FABS,
        expanded: true
    }
};

export const collapseFabs = () => {
    return {
        type: UiActionTypes.TOGGLE_FABS,
        expanded: false
    }
};

export const showModalForm = () => {
    return {
        type: UiActionTypes.TOGGLE_MODAL_FORM,
        open: true
    }
};

export const closeModalForm = () => {
    return {
        type: UiActionTypes.TOGGLE_MODAL_FORM,
        open: false
    }
};