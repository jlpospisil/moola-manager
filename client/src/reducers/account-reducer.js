import * as AccountActionTypes from '../actions/account-action-types';

export default (state = { accounts: [], account: {} }, action) => {
    switch (action.type) {
        case AccountActionTypes.LIST:
            return Object.assign({}, state, { accounts: action.accounts });
        case AccountActionTypes.GET:
            return Object.assign({}, state, { account: action.account });

        default:
            return state;
    }
};
