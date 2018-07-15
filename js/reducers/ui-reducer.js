import * as UiActionTypes from '../actions/ui-action-types';

export const theme = {
    primaryColor: "#607d8b"
};

let initialState = {
    theme
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UiActionTypes.FAB_CLICKED:
            console.log(action.fab);

            return {
                ...state,
                active: "add_item"
            };

        default:
            return state;
    }
};
