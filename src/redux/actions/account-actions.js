const base_url = '/api/account';

export const actions = {
  LOAD_ACCOUNTS: 'LOAD_ACCOUNTS',
  UPDATE_LOADING: 'UPDATE_LOADING',
  CLEAR_CURRENT_ACCOUNT: 'CLEAR_CURRENT_ACCOUNT',
  UPDATE_CURRENT_ACCOUNT: 'UPDATE_CURRENT_ACCOUNT',
  ADD_ACCOUNT: 'ADD_ACCOUNT',
  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
  DELETE_ACCOUNT: 'DELETE_ACCOUNT',
};

export const updateLoading = (loading) => {
  return {
    type: actions.UPDATE_LOADING,
    loading
  };
};

export const clearCurrentAccount = () => {
  return {
    type: actions.CLEAR_CURRENT_ACCOUNT
  };
};

export const updateCurrentAccount = (current_account) => {
  return {
    type: actions.UPDATE_CURRENT_ACCOUNT,
    current_account
  };
};

export const loadAccounts = () => {
  return {
    types: ['AXIOS', actions.LOAD_ACCOUNTS],
    payload: {
      request:{
        url: base_url
      }
    }
  };
};

export const createNewAccount = (data) => {
  return {
    types: ['AXIOS', actions.ADD_ACCOUNT],
    payload: {
      request: {
        url: base_url,
        method: 'POST',
        data
      }
    }
  };
};

export const updateAccount = (data) => {
  return {
    types: ['AXIOS', actions.UPDATE_ACCOUNT],
    payload: {
      request: {
        url: `${base_url}/${data.id}`,
        method: 'PUT',
        data
      }
    }
  };
};

export const deleteAccount = (id) => {
  return {
    types: ['AXIOS', actions.DELETE_ACCOUNT],
    id,
    payload: {
      request: {
        url: `${base_url}/${id}`,
        method: 'DELETE',
        data: { id } // Not needed for axios request, but is used to get the id of the deleted account in account-reducer
      }
    }
  };
};
