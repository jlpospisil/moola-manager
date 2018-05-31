import * as TransactionActionTypes from '../actions/transaction-action-types';

const initialState = {
    transactions: [],
    transaction: {
        amount: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TransactionActionTypes.LIST:
            return { ...state, transactions: action.transactions };

        case TransactionActionTypes.GET:
            return { ...state, transaction: action.transaction };

        default:
            return state;
    }
};
