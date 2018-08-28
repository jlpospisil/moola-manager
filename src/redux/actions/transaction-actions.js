const base_url = '/api/transaction';

export const actions = {
  UPDATE_LOADING: 'UPDATE_LOADING',
  LOAD_ACCOUNT_TRANSACTIONS: 'LOAD_ACCOUNT_TRANSACTIONS'
};

export const updateLoading = (loading) => {
  return {
    type: actions.UPDATE_LOADING,
    loading
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