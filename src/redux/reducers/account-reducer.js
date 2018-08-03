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
  case 'LOAD_ACCOUNTS': {
    const response = action.payload;
    const accounts = response.status === 200 && Array.isArray(response.data) ? response.data : [];
    return {
      ...state,
      loading: false,
      accounts
    };
  }
  default: {
    return state;
  }
  }
};
