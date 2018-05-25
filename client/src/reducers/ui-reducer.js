import * as UiActionTypes from '../actions/ui-action-types';

let initialState = {
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
    fabs: {
        expanded: false
    }
};

initialState.fab_items = initialState.menu_items.filter(item => item.fab)
    .sort((a, b) => {
        return a.fab.index - b.fab.index;
    })
    .map((item, index) => {
        item.label = item.fab.label;

        if (index > 0) {
            item.backgroundColor = "#cccccc";
            item.color = "#333333";
        }

        return item;
    })
    .reverse();

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

        case UiActionTypes.TOGGLE_FABS:
            return {
                ...initialState,
                ...state,
                fabs: {
                    expanded: action.expanded
                }
            };

        default:
            return {
                ...initialState,
                ...state
            };
    }
};
