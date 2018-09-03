import { actions } from '../actions/transaction-actions';

const initialState = {
  loading: false,
  transactions: [],
  current_transaction: {
    id: null,
    account_id: null,
    merchant: {
      id: null,
      name: null
    },
    description: null,
    amount: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
      case actions.UPDATE_LOADING: {
        const { loading } = action;
        return {
          ...state,
          loading
        };
      }
      case actions.UPDATE_CURRENT_TRANSACTION: {
        const { current_transaction } = action;
        return {
          ...state,
          current_transaction
        };
      }
      case actions.LOAD_ACCOUNT_TRANSACTIONS: {
        const response = action.payload;
        const transactions = response.status === 200 && Array.isArray(response.data) ? response.data : [];
        return {
          ...state,
          loading: false,
          transactions
        };
      }
      case actions.ADD_TRANSACTION: {
        const response = action.payload;
        const { transactions } = state;
        if (response.status === 200) {
          const { id } = action.meta.previousAction;
          return {
            ...state,
            transactions: [
              ...transactions.filter(transaction => transaction.id !== id),
              response.data
            ]
          };
        }

        return state;
      }
      case actions.DELETE_TRANSACTION: {
        const response = action.payload;
        const { transactions } = state;

        // TODO: only do this if the transaction was for the current_account
        if (response.status === 200) {
          const { id } = action.meta.previousAction;
          return {
            ...state,
            transactions: transactions.filter(transaction => transaction.id !== id)
          };
        }

        return state;
      }
      case actions.CLEAR_CURRENT_TRANSACTION: {
        const { current_transaction } = initialState;
        return {
          ...state,
          current_transaction
        };
      }
      default: {
        return state;
      }
  }
};
