import * as UiActionTypes from './ui-action-types';

export const fabClicked = (fab) => {
    return {
        type: UiActionTypes.FAB_CLICKED,
        fab
    }
};