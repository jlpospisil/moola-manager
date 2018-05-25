import * as UiActionTypes from '../actions/ui-action-types';

const initialState = {
    menu_items: [
        {
            title: 'Accounts',
            fab: {
                index: 3,
                label: 'Add Account'
            },
            icon: 'md-card'
        },
        {
            title: 'Transactions',
            fab: {
                index: 1,
                label: 'Add Transaction'
            },
            icon: 'md-receipt'
        },
        {
            title: 'Budgets',
            icon: 'md-chart'
        },
        {
            title: 'Categories',
            fab: {
                index: 2,
                label: 'Add Category'
            },
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

export default (state = {}, action) => {
    switch (action.type) {
        case UiActionTypes.TOGGLE_NAV:
            return {
                ...initialState,
                ...state,
                left_nav: {
                    open: action.open
                }
            };

        default:
            return {
                ...initialState,
                ...state
            };
    }
};
