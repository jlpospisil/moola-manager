import * as UiActionTypes from './ui-action-types';

export const changeActiveItem = (item) => {
    return {
        type: UiActionTypes.CHANGE_ACTIVE_ITEM,
        item
    }
};

export const fabClicked = (fab) => {
    return {
        type: UiActionTypes.FAB_CLICKED,
        fab
    }
};