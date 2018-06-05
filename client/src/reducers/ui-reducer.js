import * as UiActionTypes from '../actions/ui-action-types';

let initialState = {
    icons: {
        account: 'md-card',
        budget: 'md-chart',
        category: 'md-folder',
        transaction: 'md-receipt'
    },
    left_nav: {
        open: false,
        items: [
            { item: 'account', label: 'Accounts', path: '/accounts' },
            { item: 'budget', label: 'Budgets', path: '/budgets' },
            { item: 'category', label: 'Categories', path: '/categories' }
        ]
    },
    fabs: {
        expandable: false,
        expanded: false,
        items: [
            { item: 'transaction', label: 'Add Transaction' },
            { item: 'account', label: 'Add Account' },
            { item: 'category', label: 'Add Category' }
        ],
        visible: true
    },
    modal_form: {
        form: null,
        fields: [],
        can_submit: false,
        open: false,
        item_fields: {
            account: [
                { name: "name", required: true, value: "here" },
                // { name: "balance", required: false, value: "" }
            ],
            transaction: [
                { name: "_account", required: true, label: "Account", value: "" },
                // { name: "_vendor", required: false, label: "Vendor", value: "" },
                { name: "amount", required: true, value: "" }
            ]
        }
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UiActionTypes.TOGGLE_NAV:
            return {
                ...state,
                left_nav: {
                    ...state.left_nav,
                    open: action.open
                }
            };

        case UiActionTypes.TOGGLE_FABS_VISIBILITY:
            return {
                ...state,
                fabs: {
                    ...state.fabs,
                    visible: action.visible
                }
            };

        case UiActionTypes.TOGGLE_FABS_EXPANDABLE:
            return {
                ...state,
                fabs: {
                    ...state.fabs,
                    expandable: action.expandable
                }
            };

        case UiActionTypes.TOGGLE_FABS:
            return {
                ...state,
                fabs: {
                    ...state.fabs,
                    expanded: action.expanded
                }
            };

        case UiActionTypes.TOGGLE_MODAL_FORM:
            return {
                ...state,
                modal_form: {
                    ...state.modal_form,
                    open: action.open
                }
            };

        case UiActionTypes.SET_MODAL_FORM:
            return {
                ...state,
                modal_form: {
                    ...state.modal_form,
                    form: action.form
                }
            };

        case UiActionTypes.SET_MODAL_FORM_CAN_SUBMIT:
            return {
                ...state,
                modal_form: {
                    ...state.modal_form,
                    can_submit: action.can_submit
                }
            };

        case UiActionTypes.UPDATE_MODAL_FORM_FIELDS:
            return {
                ...state,
                modal_form: {
                    ...state.modal_form,
                    fields: [...action.fields]
                }
            };

        default:
            return state;
    }
};
