import * as TransactionActionTypes from '../actions/transaction-action-types';

const initialState = {
    transactions: [],
    transaction: {
        amount: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TransactionActionTypes.GET_TRANSACTION:
            return { ...state, transaction: action.transaction };

        case TransactionActionTypes.GET_TRANSACTIONS:
            return { ...state, transactions: action.transactions };

        default:
            return state;
    }
};
