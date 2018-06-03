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
        case AccountActionTypes.GET_ACCOUNT:
            return { ...state, account: action.account };

        case AccountActionTypes.GET_ACCOUNTS:
            return { ...state, accounts: action.accounts };

        case AccountActionTypes.GET_ACCOUNT_TRANSACTIONS:
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
