import * as UiActionTypes from '../actions/ui-action-types';

export const theme = {
    primaryColor: "#607d8b",
    secondaryColor: "#ff6d00"
};

let initialState = {
    theme,
    fabs: [
        { key: "account", title: "New Account", icon: "credit-card" },
        { key: "transaction", title: "New Transaction", icon: "receipt" }
    ]
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
