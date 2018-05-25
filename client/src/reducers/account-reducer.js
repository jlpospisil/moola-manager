import * as AccountActionTypes from '../actions/account-action-types';

const initialState = {
    accounts: [],
    account: {
        name: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AccountActionTypes.LIST:
            return { ...state, accounts: action.accounts };
        case AccountActionTypes.GET:
            return { ...state, account: action.account };
        default:
            return state;
    }
};
