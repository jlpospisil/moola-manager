import { handleLogin } from '../../middleware/axios';

export const actions = {
  UPDATE_SIGNED_IN: 'UPDATE_SIGNED_IN',
  UPDATE_CHECKING_AUTH: 'UPDATE_CHECKING_AUTH'
};

export const updateCheckingAuth = (checking_auth_status) => {
  return {
    type: actions.UPDATE_CHECKING_AUTH,
    checking_auth_status
  };
};

export const updateSignedIn = (signed_in) => {
  return {
    type: actions.UPDATE_SIGNED_IN,
    signed_in
  };
};
