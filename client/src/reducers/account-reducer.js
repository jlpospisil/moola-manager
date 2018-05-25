import * as AccountActionTypes from '../actions/account-action-types';

const initialState = {
    accounts: [],
    account: {}
};

export default (state = {}, action) => {
    switch (action.type) {
        case AccountActionTypes.LIST:
            return { ...initialState, ...state, accounts: action.accounts };
        case AccountActionTypes.GET:
            return { ...initialState, ...state, account: action.account };

        default:
            return { ...initialState, state };
    }
};
