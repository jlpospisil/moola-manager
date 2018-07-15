import * as UiActionTypes from '../actions/ui-action-types';

let initialState = {
    theme: {
        primaryColor: '#607d8b',
    },
    active: 'calendar',
    fabs: [
        { name: 'category', label: 'Add Category', icon: 'folder' },
        { name: 'account', label: 'Add Account', icon: 'credit-card' },
        { name: 'transaction', label: 'Add Transaction', icon: 'receipt' }
    ],
    navigation: {
        bottom: [
            { key: 'categories', label: 'Categories', icon: 'folder' },
            { key: 'accounts', label: 'Accounts', icon: 'credit-card' },
            { key: 'calendar', label: 'Calendar', icon: 'event' }
        ]
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UiActionTypes.CHANGE_ACTIVE_ITEM:
            return {
                ...state,
                active: action.item
            };

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
