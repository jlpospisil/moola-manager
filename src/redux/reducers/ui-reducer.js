import { actions } from '../actions/ui-actions';

const initialState = {
  checking_auth_status: true,
  signed_in: false
};

export default (state = initialState, action) => {
  switch (action.type) {
  case actions.UPDATE_CHECKING_AUTH: {
    const { checking_auth_status } = action;
    return {
      ...state,
      checking_auth_status
    };
  }
  case actions.UPDATE_SIGNED_IN: {
    const { signed_in } = action;
    return {
      ...state,
      signed_in
    };
  }
  default: {
    return state;
  }
  }
};
