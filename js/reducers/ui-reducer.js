import * as UiActionTypes from '../actions/ui-action-types';

let initialState = {
    theme: {
        palette: {
            primaryColor: '#607d8b',
            // accentColor: ''
        },
        toolbar: {
            container: {
                paddingTop: 25,
                height: 75
            },
        },
    },
    active: 'transaction',
    icons: {
        account: 'credit-card',
        budget: 'multiline-chart',
        category: 'folder',
        transaction: 'receipt'
    },
    navigation: {
        bottom: [
            { key: 'budget', label: 'Budgets', path: '/budget' },
            { key: 'category', label: 'Categories', path: '/category' },
            { key: 'account', label: 'Accounts', path: '/account' },
            { key: 'transaction', label: 'Transactions', path: '/transaction' }
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

        default:
            return state;
    }
};
