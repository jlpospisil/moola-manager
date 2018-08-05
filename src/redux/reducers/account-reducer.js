import { actions } from '../actions/account-actions';

const initialState = {
  loading: false,
  accounts: []
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
  case actions.LOAD_ACCOUNTS: {
    const response = action.payload;
    const accounts = response.status === 200 && Array.isArray(response.data) ? response.data : [];
    return {
      ...state,
      loading: false,
      accounts
    };
  }
  case actions.DELETE_ACCOUNT: {
    const response = action.payload;
    let { accounts } = state;
    if (response.status === 200) {
      const { id } = action.meta.previousAction;
      const index = accounts.findIndex(account => account.id === id);
      accounts = JSON.parse(JSON.stringify(accounts));  // wasn't working with reference, so make deep copy
      accounts.splice(index, 1);
    }

    return {
      ...state,
      accounts
    };
  }
  default: {
    return state;
  }
  }
};
