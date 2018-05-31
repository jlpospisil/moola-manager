import * as AccountActionTypes from '../actions/account-action-types';

const initialState = {
    accounts: [],
    account: {
        name: null,
        transactions: []
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AccountActionTypes.LIST:
            return { ...state, accounts: action.accounts };

        case AccountActionTypes.GET:
            return { ...state, account: action.account };

        case AccountActionTypes.LIST_ACCOUNT_TRANSACTIONS:
            return {
                ...state,
                account: {
                    ...state.account,
                    transactions: action.transactions
                }
            };

        default:
            return state;
    }
};
