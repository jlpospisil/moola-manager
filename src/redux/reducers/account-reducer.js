import { actions } from '../actions/account-actions';

const initialState = {
  loading: false,
  accounts: [],
  current_account: {
    id: null,
    name: null,
    description: null,
    balance: null
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
      case actions.CLEAR_CURRENT_ACCOUNT: {
        const { current_account } = initialState;
        return {
          ...state,
          current_account
        };
      }
      case actions.UPDATE_CURRENT_ACCOUNT: {
        const { current_account } = action;
        return {
          ...state,
          current_account
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
      case actions.ADD_ACCOUNT: {
        const response = action.payload;
        const { accounts } = state;
        if (response.status === 200) {
          const { id } = action.meta.previousAction;
          return {
            ...state,
            accounts: [
              ...accounts.filter(account => account.id !== id),
              response.data
            ]
          };
        }

        return state;
      }
      case actions.UPDATE_ACCOUNT: {
        const response = action.payload;
        const { accounts } = state;

        if (response.status === 200) {
          const { id } = response.data;
          return {
            ...state,
            accounts: accounts.map((account) => {
              if (account.id === id) {
                return response.data;
              }

              return account;
            })
          };
        }

        return state;
      }
      case actions.DELETE_ACCOUNT: {
        const response = action.payload;
        const { accounts } = state;

        if (response.status === 200) {
          const { id } = action.meta.previousAction;
          return {
            ...state,
            accounts: accounts.filter(account => account.id !== id)
          };
        }

        return state;
      }
      default: {
        return state;
      }
  }
};
