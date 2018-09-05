const base_url = '/api/transaction';

const account_specific_url = (account_id) => {
  return `/api/account/${account_id}/transaction`;
};

export const actions = {
  UPDATE_LOADING: 'UPDATE_LOADING',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_CURRENT_TRANSACTION: 'UPDATE_CURRENT_TRANSACTION',
  LOAD_ACCOUNT_TRANSACTIONS: 'LOAD_ACCOUNT_TRANSACTIONS',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  CLEAR_CURRENT_TRANSACTION: 'CLEAR_CURRENT_TRANSACTION',
  LOAD_MERCHANTS: 'LOAD_MERCHANTS'
};

export const updateLoading = (loading) => {
  return {
    type: actions.UPDATE_LOADING,
    loading
  };
};

export const clearCurrentTransaction = () => {
  return {
    type: actions.CLEAR_CURRENT_TRANSACTION
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
        url: account_specific_url(account_id)
      }
    }
  };
};

export const createNewTransaction = (transaction) => {
  const { account_id, ...data } = transaction;
  return {
    types: ['AXIOS', actions.ADD_TRANSACTION],
    payload: {
      request: {
        url: account_id ? account_specific_url(account_id) : base_url,
        method: 'POST',
        data
      }
    }
  };
};

export const deleteTransaction = (id) => {
  return {
    types: ['AXIOS', actions.DELETE_TRANSACTION],
    id,
    payload: {
      request: {
        url: `${base_url}/${id}`,
        method: 'DELETE',
        data: { id } // Not needed for axios request, but is used to get the id of the deleted transaction in transaction-reducer
      }
    }
  };
};

export const loadMerchants = () => {
  return {
    types: ['AXIOS', actions.LOAD_MERCHANTS],
    payload: {
      request: {
        url: '/api/merchant'
      }
    }
  };
};