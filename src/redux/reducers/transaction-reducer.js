import { actions } from '../actions/transaction-actions';

const initialState = {
  loading: false,
  transactions: [],
  current_transaction: {
    id: null,
    vendor: null,
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
      default: {
        return state;
      }
  }
};
