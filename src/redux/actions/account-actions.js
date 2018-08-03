const base_url = '/api/account';

export const actions = {
  UPDATE_LOADING: 'UPDATE_LOADING'
};

export const updateLoading = (loading) => {
  return {
    type: actions.UPDATE_LOADING,
    loading
  };
};

export const loadAccounts = () => {
  return {
    types: ['AXIOS', 'LOAD_ACCOUNTS'],
    payload: {
      request:{
        url: base_url
      }
    }
  };
};
