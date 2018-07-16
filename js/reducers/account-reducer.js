import * as AccountActionTypes from '../actions/account-action-types';

let initialState = {
    accounts: [
        { id: "1", name: "Testing 123", balance: "21.08" },
        { id: "2", name: "Testing 456", balance: "52.01" }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};