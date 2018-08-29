const base_url = '/api/transaction';

export const actions = {
  UPDATE_LOADING: 'UPDATE_LOADING',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_CURRENT_TRANSACTION: 'UPDATE_CURRENT_TRANSACTION',
  LOAD_ACCOUNT_TRANSACTIONS: 'LOAD_ACCOUNT_TRANSACTIONS'
};

export const updateLoading = (loading) => {
  return {
    type: actions.UPDATE_LOADING,
    loading
  };
};

export const updateCurrentTransaction = (current_transaction) => {
  return {
    type: actions.UPDATE_CURRENT_TRANSACTION,
    current_transaction
  };
};

export const loadAccountTransactions = (account_id) => {
  return {
    types: ['AXIOS', actions.LOAD_ACCOUNT_TRANSACTIONS],
    payload: {
      request:{
        url: `/api/account/${account_id}/transaction`
      }
    }
  };
};

export const createNewTransaction = (data) => {
  const { account_id } = data;
  return {
    types: ['AXIOS', actions.ADD_TRANSACTION],
    payload: {
      request: {
        url: account_id ? `/api/account/${account_id}/transaction` : base_url,
        method: 'POST',
        data
      }
    }
  };
};