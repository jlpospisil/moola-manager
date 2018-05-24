import * as UiActionTypes from '../actions/ui-action-types';

const initialState = {
    menu_items: [
        {
            title: 'Accounts',
            icon: 'md-accounts-list'
        },
        {
            title: 'Transactions',
            icon: 'md-receipt'
        },
        {
            title: 'Budgets',
            icon: 'md-chart'
        },
        {
            title: 'Categories',
            icon: 'md-folder'
        },
        {
            title: 'Settings',
            icon: 'md-settings'
        }
    ],
    left_nav: {
        open: false
    },
};

export default (state = initialState, action) => {
    console.log({ state });
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
