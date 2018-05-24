import * as UiActionTypes from '../actions/ui-action-types';

const initialState = {
    left_nav: {
        open: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UiActionTypes.TOGGLE_NAV:
            return {
                ...state,
                left_nav: {
                    open: action.open
                }
            };

        default:
            return state;
    }
};
