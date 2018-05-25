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
    },
    modal_form: {
        open: false
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

export default (state = initialState, action) => {
    switch (action.type) {
        case UiActionTypes.TOGGLE_NAV:
            return {
                ...state,
                left_nav: {
                    open: action.open
                }
            };

        case UiActionTypes.TOGGLE_FABS:
            return {
                ...state,
                fabs: {
                    expanded: action.expanded
                }
            };

        case UiActionTypes.TOGGLE_MODAL_FORM:
            return {
                ...state,
                modal_form: {
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
