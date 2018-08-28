import { actions } from '../actions/transaction-actions';

const initialState = {
  loading: false,
  transactions: []
};

export default (state = initialState, action) => {
  switch (action.type) {
      default: {
        return state;
      }
  }
};
