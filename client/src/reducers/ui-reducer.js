import * as UiActionTypes from '../actions/ui-action-types';

let initialState = {
    path: "/",
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
        expandable: false,
        expanded: false
    },
    modal_form: {
        form: null,
        fields: [],
        can_submit: false,
        open: false,
        item_fields: {
            account: [
                { name: "name", required: true, value: "" },
                { name: "balance", required: false, value: "" }
            ]
        }
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
    const { modal_form, fabs } = state;

    switch (action.type) {
        case UiActionTypes.UPDATE_PATH:
            return {
                ...state,
                path: action.path
            };

        case UiActionTypes.TOGGLE_NAV:
            return {
                ...state,
                left_nav: {
                    open: action.open
                }
            };

        case UiActionTypes.TOGGLE_FABS_EXPANDABLE:
            return {
                ...state,
                fabs: {
                    ...fabs,
                    expandable: action.expandable
                }
            };

        case UiActionTypes.TOGGLE_FABS:
            return {
                ...state,
                fabs: {
                    ...fabs,
                    expanded: action.expanded
                }
            };

        case UiActionTypes.TOGGLE_MODAL_FORM:
            return {
                ...state,
                modal_form: {
                    ...modal_form,
                    open: action.open
                }
            };

        case UiActionTypes.SET_MODAL_FORM:
            return {
                ...state,
                modal_form: {
                    ...modal_form,
                    form: action.form
                }
            };

        case UiActionTypes.SET_MODAL_FORM_CAN_SUBMIT:
            return {
                ...state,
                modal_form: {
                    ...modal_form,
                    can_submit: action.can_submit
                }
            };

        case UiActionTypes.UPDATE_MODAL_FORM_FIELDS:
            return {
                ...state,
                modal_form: {
                    ...modal_form,
                    fields: [...action.fields]
                }
            };

        default:
            return {
                ...initialState,
                ...state
            };
    }
};
